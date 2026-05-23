import React, { useState, useEffect, useRef } from 'react';
import { multipleChoiceQuestions, arrangementQuestions, Question, ArrangementQuestion } from './data/questions';
import { px4MultipleChoiceQuestions, px4ArrangementQuestions } from './data/px4_questions';
import { Trophy, CheckCircle2, AlertCircle, Clock, ArrowLeft, Home, Calendar, HelpCircle, FileText, Users, QrCode, ChevronRight, ChevronLeft, ChevronDown, Edit, Loader2, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from './firebase';
import { collection, addDoc, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

type AppState = 'setup' | 'quiz' | 'result' | 'leaderboard' | 'review';
type AnyQuestion = Question | ArrangementQuestion;

interface QuizResult {
  id: string;
  teamName: string;
  score: number;
  totalQuestions: number;
  submittedAt: number;
  timeTaken?: number;
}

const LOCAL_STORAGE_KEY = 'quiz_results_v1';

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function App() {
  const [appState, setAppState] = useState<AppState>('setup');
  const [teamName, setTeamName] = useState('');
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState<AnyQuestion[]>([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showStartConfirmModal, setShowStartConfirmModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(false);
  const [isClearingHistory, setIsClearingHistory] = useState(false);
  const [saveToLeaderboard, setSaveToLeaderboard] = useState(true);
  const [clearPassword, setClearPassword] = useState('');
  const [clearPasswordError, setClearPasswordError] = useState('');
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);

  const submitQuizRef = useRef<((isAutoSubmit?: boolean | React.MouseEvent) => void) | null>(null);

  useEffect(() => {
    if (appState === 'quiz' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (appState === 'quiz' && timeLeft === 0 && !isSubmitting) {
      if (submitQuizRef.current) {
        submitQuizRef.current(true);
      }
    }
  }, [appState, timeLeft, isSubmitting]);

  const handleStartClick = () => {
    setShowNameModal(true);
  };

  const handlePreStartQuiz = () => {
    if (saveToLeaderboard) {
      if (!teamName.trim()) {
        setError('Vui lòng chọn đội thi');
        return;
      }
      setShowNameModal(false);
      setShowStartConfirmModal(true);
    } else {
      confirmStartQuiz();
    }
  };

  const confirmStartQuiz = () => {
    if (saveToLeaderboard && !teamName.trim()) {
      setError('Vui lòng chọn đội thi');
      return;
    }
    
    const finalTeamName = teamName.trim() || 'Thí sinh tự do';
    setTeamName(finalTeamName);

    setError('');
    setAnswers({});
    
    let selectedMCQ = multipleChoiceQuestions;
    let selectedArrangement = arrangementQuestions;

    const finalTeamNameLower = finalTeamName.toLowerCase().replace(/\s+/g, ' ');
    const normalizedName = finalTeamNameLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const isPX4 = finalTeamNameLower.includes('phân xưởng 4') || 
                  finalTeamNameLower.includes('px4') || 
                  finalTeamNameLower.includes('px 4') ||
                  normalizedName.includes('phan xuong 4');

    if (isPX4) {
      selectedMCQ = px4MultipleChoiceQuestions;
      selectedArrangement = px4ArrangementQuestions;
    }

    const isCoQuan = finalTeamNameLower.includes('cơ quan') || 
                     normalizedName.includes('co quan');

    const adjustedMCQ = selectedMCQ.map(q => {
      if (q.type === 'multiple-choice') {
        const adjustedOptions = q.options.map(opt => {
          let text = opt.text;
          const isCorrect = opt.id === q.correctAnswer;
          
          if (isCoQuan) {
            if (isCorrect) {
              while (text.endsWith('.')) {
                text = text.slice(0, -1);
              }
              text = text + '.';
            } else {
              while (text.endsWith('.')) {
                text = text.slice(0, -1);
              }
            }
          } else {
            while (text.endsWith('.')) {
              text = text.slice(0, -1);
            }
          }
          return { ...opt, text };
        });
        return { ...q, options: adjustedOptions };
      }
      return q;
    });
    
    const shuffledMC = shuffleArray(adjustedMCQ).slice(0, 20).map(q => {
      if (q.type === 'multiple-choice') {
        const hasFixedOptions = q.options.some(opt => {
          const t = opt.text.toLowerCase();
          return t.includes('tất cả') || t.includes('cả a') || t.includes('cả b') || t.includes('cả c') || t.includes('phương án trên') || t.includes('đáp án trên') || t.includes('cả 2') || t.includes('cả hai') || t.includes('đều đúng');
        });

        if (hasFixedOptions) {
          return q;
        }

        const correctAnswerText = q.options.find(opt => opt.id === q.correctAnswer)?.text;
        const letters = ['A', 'B', 'C', 'D', 'E', 'F']; // letters array handle up to 6 options
        const shuffledOptions = shuffleArray(q.options).map((opt, idx) => ({
          ...opt,
          id: letters[idx]
        }));
        const newCorrectAnswerId = shuffledOptions.find(opt => opt.text === correctAnswerText)?.id || q.correctAnswer;
        return {
          ...q,
          options: shuffledOptions,
          correctAnswer: newCorrectAnswerId
        };
      }
      return q;
    });
    
    let allQs = [...shuffledMC];
    const initialAnswers: Record<number, any> = {};

    setCurrentQuestions(allQs);
    setAnswers(initialAnswers);
    
    setTimeLeft(15 * 60);
    setAppState('quiz');
    setShowNameModal(false);
  };

  const moveArrangement = (questionId: number, index: number, direction: number) => {
    setAnswers(prev => {
      const currentItems = [...prev[questionId]];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= currentItems.length) return prev;
      
      const temp = currentItems[index];
      currentItems[index] = currentItems[newIndex];
      currentItems[newIndex] = temp;
      
      return { ...prev, [questionId]: currentItems };
    });
  };

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const submitQuiz = async (isAutoSubmit?: boolean | React.MouseEvent) => {
    const isAuto = typeof isAutoSubmit === 'boolean' ? isAutoSubmit : false;
    // Kiểm tra xem đã trả lời đủ câu chưa (MCQ only)
    const mcqQuestions = currentQuestions.filter(q => q.type === 'multiple-choice');
    const unanswered = mcqQuestions.filter(q => answers[q.id] === undefined);
    if (!isAuto && unanswered.length > 0) {
      const missing = unanswered.length;
      setError(`Vui lòng hoàn thành bài thi. Bạn còn thiếu ${missing} câu trắc nghiệm chưa trả lời.`);
      
      // Cuộn đến câu chưa trả lời đầu tiên
      const firstUnanswered = unanswered[0];
      const el = document.getElementById(`question-${firstUnanswered.id}`);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);
    setError('');

    let calculatedScore = 0;
    currentQuestions.forEach(q => {
      if (q.type === 'multiple-choice') {
        if (answers[q.id] === q.correctAnswer) calculatedScore++;
      } else if (q.type === 'arrangement') {
        const originalQ = [...arrangementQuestions, ...px4ArrangementQuestions].find(a => a.id === q.id);
        const isCorrect = originalQ && JSON.stringify(answers[q.id]) === JSON.stringify(originalQ.items);
        if (isCorrect) calculatedScore++;
      }
    });

    setScore(calculatedScore);

    const timeTaken = (15 * 60) - timeLeft;

    const newResult = {
      uid: `anon_${Math.random().toString(36).substring(2, 9)}`,
      teamName: teamName.trim(),
      score: calculatedScore,
      totalQuestions: currentQuestions.length,
      submittedAt: Date.now(),
      timeTaken: timeTaken
    };

    try {
      if (saveToLeaderboard) {
        await addDoc(collection(db, 'results'), newResult);
      }
      
      setAppState('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError('Có lỗi xảy ra khi lưu kết quả lên hệ thống.');
      handleFirestoreError(err, OperationType.CREATE, 'results');
    } finally {
      setIsSubmitting(false);
    }
  };

  submitQuizRef.current = submitQuiz;

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const q = query(collection(db, 'results'), orderBy('score', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const results: QuizResult[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          id: doc.id,
          teamName: data.teamName,
          score: data.score,
          totalQuestions: data.totalQuestions,
          submittedAt: data.submittedAt,
          timeTaken: data.timeTaken
        });
      });

      const sorted = results.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        // Nếu bằng điểm, ai nộp sớm hơn xếp trên (thời gian nộp),
        // hoặc nếu có timeTaken, ai làm nhanh hơn xếp trên
        if (a.timeTaken && b.timeTaken && a.timeTaken !== b.timeTaken) {
            return a.timeTaken - b.timeTaken;
        }
        return a.submittedAt - b.submittedAt;
      });
      setLeaderboard(sorted);
      setAppState('leaderboard');
    } catch (err) {
      setError('Không thể tải bảng xếp hạng, vui lòng thử lại sau.');
      handleFirestoreError(err, OperationType.LIST, 'results');
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const processClearHistory = async () => {
    if (clearPassword !== '12345678@') {
      setClearPasswordError('Mật khẩu không chính xác.');
      return;
    }
    setClearPasswordError('');
    setIsClearingHistory(true);
    setShowClearConfirmModal(false);
    try {
      const q = query(collection(db, 'results'));
      const querySnapshot = await getDocs(q);
      const deletePromises = querySnapshot.docs.map(document => deleteDoc(doc(db, 'results', document.id)));
      await Promise.all(deletePromises);
      setLeaderboard([]);
      // Instead of alert, just setting state is fine or show a local toast. Let's just clear errors.
      setError('');
    } catch (err) {
      setError('Có lỗi xảy ra khi xoá lịch sử thi.');
      handleFirestoreError(err, OperationType.DELETE, 'results');
    } finally {
      setIsClearingHistory(false);
    }
  };

  const clearHistoryClick = () => {
    setClearPassword('');
    setClearPasswordError('');
    setShowClearConfirmModal(true);
  };

  const resetToSetup = () => {
    setAppState('setup');
    setTeamName('');
    setAnswers({});
    setError('');
    setCurrentQuestions([]);
  };

  const handleReturnHome = () => {
    if (appState === 'quiz') {
      setShowConfirmModal(true);
    } else {
      resetToSetup();
    }
  };

  const formatTimeTaken = (seconds?: number) => {
    if (seconds === undefined) return 'Đang cập nhật';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} phút ${s} giây`;
  };

  return (
    <div className={`min-h-screen font-sans text-slate-900 ${appState === 'quiz' ? 'bg-[#f4f6f9]' : 'bg-slate-50'}`}>
      {appState !== 'quiz' && (
        <header className="bg-blue-700 text-white shadow-md sticky top-0 z-20">
          <div className="max-w-5xl mx-auto px-4 py-2 md:py-3 flex justify-between items-center">
            <h1 className="text-base md:text-2xl font-bold flex items-center gap-2 md:gap-3 cursor-pointer leading-tight sm:leading-normal" onClick={handleReturnHome}>
              <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 flex-shrink-0" />
              <span className="line-clamp-2 md:line-clamp-none">HỘI THI AN TOÀN, VỆ SINH VIÊN GIỎI CẤP CƠ SỞ NĂM 2026</span>
            </h1>
          </div>
        </header>
      )}

      {(appState === 'quiz' || appState === 'review') && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm relative">
          <div className="mx-auto px-4 lg:px-8 py-2 md:py-3 flex flex-row gap-2 md:gap-4 justify-between items-center">
            <button 
              onClick={() => appState === 'review' ? setAppState('result') : handleReturnHome()}
              className="flex items-center gap-1 text-slate-600 border border-slate-200 px-2 md:px-3 py-1.5 rounded hover:bg-slate-50 transition-colors text-[13px] md:text-sm font-medium shrink-0"
            >
              <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Quay lại</span>
            </button>
            
            <div className="font-medium text-slate-800 text-[15px] hidden md:block truncate max-w-[200px] lg:max-w-[400px]">
              Thí sinh: <span className="font-semibold">{teamName}</span>
            </div>

            <div className="flex items-center gap-3 md:gap-5 shrink-0">
              {appState === 'quiz' ? (
                <>
                  <div className={`flex items-center gap-1.5 md:gap-2 font-bold text-[14px] md:text-[15px] transition-colors ${timeLeft <= 60 ? 'text-red-600 animate-pulse' : 'text-slate-800'}`}>
                    <Clock className={`w-4 h-4 md:w-5 md:h-5 ${timeLeft <= 60 ? 'text-red-600' : 'text-slate-600'}`} />
                    <span>
                      {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <button 
                    onClick={() => submitQuiz()}
                    disabled={isSubmitting}
                    className="flex items-center gap-1 md:gap-2 bg-[#2d4b8e] hover:bg-[#203a73] text-white px-3 md:px-5 py-1.5 md:py-2 rounded font-semibold text-[13px] md:text-[15px] transition-colors shrink-0"
                  >
                    <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" /> <span className="hidden sm:inline">Nộp bài</span><span className="sm:hidden">Nộp</span>
                  </button>
                </>
              ) : (
                <div className="font-semibold text-green-600 text-[14px] md:text-[15px] flex items-center gap-1.5 md:gap-2">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  Điểm: {score} <span className="hidden sm:inline">/ {currentQuestions.length}</span>
                </div>
              )}
            </div>
          </div>
          {/* Time Progress Bar */}
          {appState === 'quiz' && (
            <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full">
              <div 
                className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 60 ? 'bg-red-500' : 'bg-blue-600'}`}
                style={{ width: `${(timeLeft / (15 * 60)) * 100}%` }}
              />
            </div>
          )}
        </header>
      )}

      <main className={(appState === 'quiz' || appState === 'review') ? "mx-auto px-4 lg:px-8 py-6 max-w-[1440px]" : "max-w-4xl mx-auto px-4 py-8"}>
        {showNameModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Nhập thông tin dự thi</h3>
              <div className="mb-6">
                <label htmlFor="teamName" className="block text-sm font-medium text-slate-700 mb-2">
                  {saveToLeaderboard ? 'Tên đội thi' : 'Họ tên / Tên đội thi (Tùy chọn)'}
                </label>
                {saveToLeaderboard ? (
                  <select
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                  >
                    <option value="">-- Chọn đội thi --</option>
                    <option value="Công trường 1">Công trường 1</option>
                    <option value="Công trường 2">Công trường 2</option>
                    <option value="Phân xưởng 4">Phân xưởng 4</option>
                    <option value="Cơ quan">Cơ quan</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePreStartQuiz()}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ea580c] focus:border-[#ea580c] outline-none transition-all"
                    placeholder="Nhập tên của bạn"
                    maxLength={100}
                  />
                )}
              </div>
              <div className="mb-6 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="saveLeaderboard" 
                  checked={saveToLeaderboard}
                  onChange={(e) => setSaveToLeaderboard(e.target.checked)}
                  className="w-4 h-4 text-[#ea580c] focus:ring-[#ea580c] rounded border-slate-300"
                />
                <label htmlFor="saveLeaderboard" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Lưu kết quả lên bảng xếp hạng
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowNameModal(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={handlePreStartQuiz}
                  className="px-5 py-2.5 bg-[#ea580c] text-white hover:bg-orange-700 rounded-lg font-medium transition-colors"
                >
                  Bắt đầu làm bài
                </button>
              </div>
            </div>
          </div>
        )}

        {showStartConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Xác nhận bắt đầu</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Bạn có chắc chắn tham gia cuộc thi với tư cách <strong className="text-slate-800">"{teamName.trim() || 'Thí sinh tự do'}"</strong> không? Kết quả này sẽ được lưu lại làm căn cứ xếp hạng.
              </p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowStartConfirmModal(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => {
                    setShowStartConfirmModal(false);
                    confirmStartQuiz();
                  }}
                  className="px-5 py-2.5 bg-[#ea580c] text-white hover:bg-orange-700 rounded-lg font-medium transition-colors"
                >
                  Đồng ý
                </button>
              </div>
            </div>
          </div>
        )}

        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Xác nhận thoát</h3>
              <p className="text-slate-600 mb-6">Bạn có chắc chắn muốn thoát? Kết quả làm bài hiện tại sẽ bị mất.</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={() => {
                    setShowConfirmModal(false);
                    resetToSetup();
                  }}
                  className="px-5 py-2.5 bg-[#ea580c] text-white hover:bg-orange-700 rounded-lg font-medium transition-colors"
                >
                  Thoát
                </button>
              </div>
            </div>
          </div>
        )}

        {showClearConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold text-red-600 mb-2">Xoá lịch sử thi</h3>
              <p className="text-slate-600 mb-4">Bạn có chắc chắn muốn xoá toàn bộ lịch sử thi trên hệ thống không? Hành động này không thể hoàn tác.</p>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu xác nhận</label>
                <input 
                  type="password"
                  value={clearPassword}
                  onChange={(e) => setClearPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      processClearHistory();
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="Nhập mật khẩu để xoá"
                />
                {clearPasswordError && (
                  <p className="text-red-500 text-sm mt-2">{clearPasswordError}</p>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowClearConfirmModal(false)}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button 
                  onClick={processClearHistory}
                  className="px-5 py-2.5 bg-red-600 text-white hover:bg-red-700 rounded-lg font-medium transition-colors flex items-center gap-2 relative min-w-[120px] justify-center"
                  disabled={isClearingHistory}
                >
                  {isClearingHistory ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Xoá vĩnh viễn'}
                </button>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm flex items-start gap-3 sticky top-24 z-10">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {appState === 'setup' && (
          <div className="max-w-2xl mx-auto mt-2 md:mt-4 px-4 h-[calc(100vh-60px)] md:h-auto overflow-hidden flex flex-col pt-[5vh] md:pt-0 pb-[10vh] md:pb-0">
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-sm border border-slate-200">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-2 md:p-4 mb-3 text-blue-900 text-[13px] md:text-[15px] leading-relaxed">
                <p className="font-semibold mb-0.5">Hướng dẫn:</p>
                <p className="mb-0.5">Các đội thi chọn tên đơn vị từ danh sách để Bắt đầu thi.</p>
                <p>Các cá nhân khác muốn thử sức hãy bỏ tích ở mục <strong>Lưu kết quả lên bảng xếp hạng</strong></p>
              </div>

              <div className="space-y-0 text-[13px] md:text-[15px]">
                <div className="flex justify-between items-center py-1.5 md:py-2">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                    <Clock className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-slate-600" />
                    <span>Thời gian làm bài</span>
                  </div>
                  <span className="font-semibold text-slate-800">15 phút</span>
                </div>
                <div className="flex justify-between items-center py-1.5 md:py-2">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                    <Calendar className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-slate-600" />
                    <span>Thời gian vào thi</span>
                  </div>
                  <span className="font-semibold text-slate-800">28/05/2025</span>
                </div>
                <div className="flex justify-between items-center py-1.5 md:py-2">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                    <HelpCircle className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-slate-600" />
                    <span>Số lượng câu hỏi</span>
                  </div>
                  <span className="font-semibold text-slate-800">20 câu</span>
                </div>
                <div className="flex justify-between items-center py-1.5 md:py-2">
                  <div className="flex items-center gap-2 md:gap-3 text-slate-700">
                    <FileText className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] text-slate-600" />
                    <span>Loại đề</span>
                  </div>
                  <span className="font-semibold text-slate-800">Trắc nghiệm</span>
                </div>
              </div>

              <button 
                onClick={handleStartClick}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 md:py-3.5 px-4 rounded transition-colors flex justify-center items-center gap-2 text-sm md:text-base shadow-sm mt-3 md:mt-6"
              >
                Bắt đầu thi <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-center mt-3 md:mt-4 mb-4 md:mb-6">
              <button 
                onClick={fetchLeaderboard}
                className="bg-[#f8fafc] border border-slate-200 text-slate-700 font-medium py-2 px-4 md:py-2.5 md:px-6 rounded hover:bg-slate-100 transition-colors inline-flex items-center justify-center gap-2 mx-auto cursor-pointer text-sm md:text-base"
              >
                Xem lịch sử làm bài
              </button>
            </div>
          </div>
        )}

        {(appState === 'quiz' || appState === 'review') && (
          <div className="flex flex-col-reverse lg:flex-row gap-6 relative items-start">
            {/* Left: Questions column */}
            <div className="flex-1 space-y-6 min-w-0 w-full">
              {currentQuestions.map((q, index) => (
                <div key={q.id} id={`question-${q.id}`} className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-4 md:p-6">
                    <h3 className="font-bold text-slate-800 mb-1 text-base">Câu {index + 1}</h3>
                    <p className="text-slate-800 font-medium mb-4 md:mb-6 text-[14px] md:text-[15px] leading-relaxed">{q.text}</p>

                    {q.type === 'multiple-choice' ? (
                      <div className="space-y-4">
                        {q.options.map((opt) => {
                          const isSelected = answers[q.id] === opt.id;
                          const isCorrect = q.correctAnswer === opt.id;
                          const isReviewMode = appState === 'review';
                          let circleClasses = 'border-slate-300 text-slate-700 bg-white group-hover:border-slate-400';
                          let boxClasses = 'border-slate-300 text-slate-700 bg-white group-hover:border-slate-400';

                          if (isReviewMode) {
                            if (isCorrect) {
                              circleClasses = 'border-green-600 bg-green-600 text-white';
                              boxClasses = 'border-green-600 text-green-700 bg-green-50 font-medium';
                            } else if (isSelected && !isCorrect) {
                              circleClasses = 'border-red-500 bg-red-500 text-white';
                              boxClasses = 'border-red-500 text-red-600 bg-red-50 font-medium';
                            } else {
                              circleClasses = 'border-slate-300 text-slate-400 bg-slate-50';
                              boxClasses = 'border-slate-300 text-slate-500 bg-slate-50 opacity-70';
                            }
                          } else {
                            if (isSelected) {
                              circleClasses = 'border-[#2d4b8e] bg-[#2d4b8e] text-white';
                              boxClasses = 'border-[#2d4b8e] text-[#2d4b8e] bg-[#f0f4fb] shadow-sm font-medium';
                            }
                          }

                          return (
                            <label 
                              key={opt.id} 
                              className={`flex items-center gap-3 md:gap-4 ${!isReviewMode ? 'cursor-pointer group' : ''}`}
                            >
                              <div className={`w-8 h-8 md:w-10 md:h-10 text-sm md:text-base rounded-full border flex flex-shrink-0 items-center justify-center transition-colors ${circleClasses}`}>
                                {opt.id}
                              </div>
                              <div className={`flex-1 border rounded-md py-2 md:py-3 px-3 md:px-4 transition-colors text-[14px] md:text-[15px] ${boxClasses}`}>
                                {opt.text}
                              </div>
                              {!isReviewMode && (
                                <input 
                                  type="radio" 
                                  name={`question-${q.id}`} 
                                  value={opt.id}
                                  checked={isSelected}
                                  onChange={() => handleAnswer(q.id, opt.id)}
                                  className="hidden"
                                />
                              )}
                            </label>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {appState !== 'review' ? (
                          <>
                            <p className="text-sm text-slate-500 mb-2 italic">Hãy dùng nút Lên/Xuống để sắp xếp các phương án sau theo thứ tự đúng đắn.</p>
                            {(answers[q.id] || []).map((item: string, i: number) => (
                              <div key={i} className="flex items-center gap-2 md:gap-3 bg-white border border-slate-300 hover:border-[#2d4b8e] rounded-md p-2 md:p-3 transition-colors shadow-sm">
                                <div className="flex flex-col gap-1 items-center justify-center border-r border-slate-200 pr-2 md:pr-3">
                                  <button 
                                    onClick={() => moveArrangement(q.id, i, -1)} 
                                    disabled={i === 0}
                                    className="p-1 hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent rounded"
                                  >
                                    <ArrowUp className="w-4 h-4 md:w-5 md:h-5" />
                                  </button>
                                  <button 
                                    onClick={() => moveArrangement(q.id, i, 1)} 
                                    disabled={i === answers[q.id].length - 1}
                                    className="p-1 hover:bg-slate-100 text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent rounded"
                                  >
                                    <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
                                  </button>
                                </div>
                                <div className="flex-1 text-[13px] md:text-[15px] leading-snug md:leading-normal text-slate-700 font-medium">{item}</div>
                                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs md:text-sm font-bold shrink-0">
                                   {i + 1}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-slate-500 mb-2 italic">Đáp án đúng của câu sắp xếp:</p>
                            {(() => {
                              const originalQ = [...arrangementQuestions, ...px4ArrangementQuestions].find(a => a.id === q.id);
                              const isCorrect = originalQ && JSON.stringify(answers[q.id]) === JSON.stringify(originalQ.items);
                              
                              return (
                                <div className="space-y-4">
                                  {/* User's Answer */}
                                  <div>
                                    <p className="mb-2 font-medium text-[15px] flex items-center gap-2">
                                      Lựa chọn của bạn: 
                                      {isCorrect ? (
                                        <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Đúng</span>
                                      ) : (
                                        <span className="text-red-500 font-bold flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Sai</span>
                                      )}
                                    </p>
                                    <div className="space-y-2">
                                      {(answers[q.id] || []).map((item: string, i: number) => (
                                        <div key={i} className={`flex items-center gap-2 md:gap-3 border rounded-md p-2 md:p-3 ${isCorrect ? 'border-green-600 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                                          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-slate-500 text-xs md:text-sm font-bold shrink-0 shadow-sm">
                                            {i + 1}
                                          </div>
                                          <div className={`flex-1 text-[13px] md:text-[15px] font-medium leading-snug md:leading-normal ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>{item}</div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* Correct Answer (if wrong) */}
                                  {!isCorrect && originalQ && (
                                    <div>
                                      <p className="mb-2 font-medium text-[15px] text-green-700">Đáp án đúng:</p>
                                      <div className="space-y-2">
                                        {originalQ.items.map((item: string, i: number) => (
                                          <div key={i} className="flex items-center gap-2 md:gap-3 border border-green-600 bg-green-50 rounded-md p-2 md:p-3">
                                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-slate-500 text-xs md:text-sm font-bold shrink-0 shadow-sm">
                                              {i + 1}
                                            </div>
                                            <div className="flex-1 text-[13px] md:text-[15px] text-green-800 font-medium leading-snug md:leading-normal">{item}</div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Navigation column */}
            <div className="lg:w-80 shrink-0 lg:sticky lg:top-20 z-10 w-full mb-8 lg:mb-0">
              <div className="bg-white rounded border border-slate-200 p-4 md:p-5 shadow-sm">
                <button 
                  onClick={() => setIsQuestionListOpen(!isQuestionListOpen)}
                  className="w-full flex lg:hidden items-center justify-between font-medium text-slate-800 text-[15px]"
                >
                  <span>Danh sách câu hỏi</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isQuestionListOpen ? 'rotate-180' : ''}`} />
                </button>
                <h3 className="font-medium text-slate-800 mb-4 text-[15px] hidden lg:block">Danh sách câu hỏi</h3>
                
                <div className={`grid-cols-5 gap-2 mt-4 lg:mt-0 ${isQuestionListOpen ? 'grid' : 'hidden lg:grid'}`}>
                  {currentQuestions.map((q, index) => {
                    const isAnswered = !!answers[q.id];
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          const el = document.getElementById(`question-${q.id}`);
                          if (el) {
                            const offset = 80;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = el.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: 'smooth'
                            });
                          }
                          setIsQuestionListOpen(false); // Close on mobile after selection
                        }}
                        className={`py-2 text-[13px] text-center border rounded transition-colors ${
                          isAnswered 
                            ? 'border-[#2b4491] text-slate-800 font-medium' 
                            : 'border-slate-200 text-slate-600 hover:border-slate-400 bg-white'
                        }`}
                      >
                        {(index + 1).toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {appState === 'result' && (
          <div className="bg-white p-5 md:p-8 rounded-xl shadow-sm border border-slate-200 max-w-lg mx-auto text-center mt-10">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Hoàn thành!</h2>
            <p className="text-slate-600 mb-6 md:mb-8">Cảm ơn đội <span className="font-semibold text-blue-700">{teamName}</span> đã tham gia thi.</p>
            
            <div className="bg-slate-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-slate-100">
              <div className="mb-4">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Điểm số của bạn</p>
                <p className="text-4xl md:text-5xl font-black text-blue-600">
                  {score} <span className="text-xl md:text-2xl text-slate-400 font-medium">/ {currentQuestions.length}</span>
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Thời gian hoàn thành</p>
                <p className="text-2xl font-bold text-slate-700">
                  {Math.floor(((15 * 60) - timeLeft) / 60)} phút {((15 * 60) - timeLeft) % 60} giây
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center">
              <button 
                onClick={resetToSetup}
                className="w-full sm:w-auto bg-slate-100 text-slate-700 font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Về trang chủ
              </button>
              <button 
                onClick={() => setAppState('review')}
                className="w-full sm:w-auto bg-green-600 text-white font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-green-700 transition-colors inline-block cursor-pointer"
              >
                Xem lại bài làm
              </button>
              <button 
                onClick={fetchLeaderboard}
                className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2.5 md:py-3 px-4 md:px-6 rounded-lg hover:bg-blue-700 transition-colors inline-block cursor-pointer"
              >
                Xem lịch sử làm bài
              </button>
            </div>
          </div>
        )}

        {appState === 'leaderboard' && (
          <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Trophy className="w-6 h-6 md:w-7 md:h-7 text-yellow-500 shrink-0" />
                Bảng xếp hạng
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 w-full sm:w-auto">
                <button 
                  onClick={clearHistoryClick}
                  disabled={isClearingHistory}
                  className="flex-1 sm:flex-none text-red-500 justify-center hover:text-red-700 hover:bg-red-50 text-sm font-medium flex items-center gap-1.5 px-3 py-2 sm:py-1.5 rounded transition-colors disabled:opacity-50"
                  title="Xoá toàn bộ lịch sử thi"
                >
                  {isClearingHistory ? <Loader2 className="w-4 h-4 animate-spin shrink-0" /> : <Trash2 className="w-4 h-4 shrink-0" />}
                  <span className="truncate">Xoá lịch sử</span>
                </button>
                <button 
                  onClick={resetToSetup}
                  className="flex-1 sm:flex-none text-blue-600 justify-center hover:text-blue-800 font-medium flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 sm:py-1.5 rounded transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" /> <span className="truncate">Quay lại</span>
                </button>
              </div>
            </div>

            {leaderboard.length === 0 ? (
              <div className="text-center py-8 md:py-12 text-slate-500 text-sm md:text-base">
                Chưa có kết quả nào được ghi nhận.
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <table className="w-full text-left border-collapse min-w-[500px] md:min-w-0">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="py-3 px-3 md:py-4 md:px-4 font-semibold text-slate-600 w-12 md:w-16 text-center text-[13px] md:text-base">Hạng</th>
                      <th className="py-3 px-3 md:py-4 md:px-4 font-semibold text-slate-600 text-[13px] md:text-base">Tên đội</th>
                      <th className="py-3 px-3 md:py-4 md:px-4 font-semibold text-slate-600 text-center text-[13px] md:text-base">Điểm số</th>
                      <th className="py-3 px-3 md:py-4 md:px-4 font-semibold text-slate-600 text-right text-[13px] md:text-base">Lượng thời gian làm bài</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((result, index) => (
                      <tr key={result.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-3 px-3 md:py-4 md:px-4 text-center">
                          {index === 0 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm bg-yellow-100 text-yellow-700 rounded-full font-bold">1</span>
                          ) : index === 1 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm bg-slate-200 text-slate-700 rounded-full font-bold">2</span>
                          ) : index === 2 ? (
                            <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 text-xs md:text-sm bg-orange-100 text-orange-800 rounded-full font-bold">3</span>
                          ) : (
                            <span className="text-slate-500 font-medium text-sm md:text-base">{index + 1}</span>
                          )}
                        </td>
                        <td className="py-3 px-3 md:py-4 md:px-4 font-medium text-slate-800 text-[14px] md:text-base">{result.teamName}</td>
                        <td className="py-3 px-3 md:py-4 md:px-4 text-center font-bold text-blue-600 text-[14px] md:text-base">{result.score}/{result.totalQuestions}</td>
                        <td className="py-3 px-3 md:py-4 md:px-4 text-right text-[13px] md:text-sm text-slate-500 font-medium flex items-center justify-end gap-1 md:gap-1.5">
                          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
                          <span className="whitespace-nowrap">{formatTimeTaken(result.timeTaken)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
