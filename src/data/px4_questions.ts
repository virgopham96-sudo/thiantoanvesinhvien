import { Question, ArrangementQuestion } from './questions';

export const px4MultipleChoiceQuestions: Question[] = [
  {
    id: 101,
    text: "Người lao động làm việc trong điều kiện có yếu tố nguy hiểm, độc hại có quyền yêu cầu người sử dụng lao động làm gì?",
    options: [
      { id: "A", text: "Tăng lương tương xứng với mức độ nguy hiểm" },
      { id: "B", text: "Cung cấp thông tin đầy đủ về các yếu tố nguy hiểm, có hại và biện pháp phòng ngừa" },
      { id: "C", text: "Cho phép từ chối làm việc bất kỳ lúc nào" },
      { id: "D", text: "Được miễn các quy định kỷ luật lao động" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 102,
    text: "Theo Luật ATVSLĐ, An toàn vệ sinh viên được bầu như thế nào?",
    options: [
      { id: "A", text: "Do Giám đốc chỉ định theo đề xuất của Phòng An toàn" },
      { id: "B", text: "Do tập thể người lao động bầu tại tổ, đội sản xuất" },
      { id: "C", text: "Do Công đoàn cơ sở bổ nhiệm" },
      { id: "D", text: "Do Phòng Tổ chức nhân sự quyết định" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 103,
    text: "Khi xảy ra tai nạn lao động, người sử dụng lao động phải khai báo với cơ quan có thẩm quyền trong thời gian bao lâu kể từ khi xảy ra tai nạn (đối với tai nạn chết người)?",
    options: [
      { id: "A", text: "Ngay khi xảy ra tai nạn" },
      { id: "B", text: "Trong vòng 24 giờ" },
      { id: "C", text: "Trong vòng 48 giờ" },
      { id: "D", text: "Trong vòng 72 giờ" }
    ],
    correctAnswer: "A",
    type: 'multiple-choice'
  },
  {
    id: 104,
    text: "Luật An toàn, vệ sinh lao động hiện hành được Quốc hội nước CHXHCN Việt Nam thông qua vào năm nào?",
    options: [
      { id: "A", text: "Năm 2012" },
      { id: "B", text: "Năm 2013" },
      { id: "C", text: "Năm 2015" },
      { id: "D", text: "Năm 2016" }
    ],
    correctAnswer: "C",
    type: 'multiple-choice'
  },
  {
    id: 105,
    text: "Theo quy định, người sử dụng lao động phải tổ chức huấn luyện ATVSLĐ cho người lao động ít nhất bao nhiêu lần trong năm?",
    options: [
      { id: "A", text: "1 lần/năm" },
      { id: "B", text: "2 lần/năm" },
      { id: "C", text: "3 lần/năm" },
      { id: "D", text: "Theo yêu cầu thực tế" }
    ],
    correctAnswer: "A",
    type: 'multiple-choice'
  },
  {
    id: 106,
    text: "Theo Luật ATVSLĐ 2015, mạng lưới an toàn vệ sinh viên hoạt động dưới sự quản lý và hướng dẫn của tổ chức nào?",
    options: [
      { id: "A", text: "Ban Chỉ huy - Giám đốc công ty" },
      { id: "B", text: "Phòng An toàn - Bảo hộ lao động" },
      { id: "C", text: "Công đoàn cơ sở" },
      { id: "D", text: "Hội đồng ATVSLĐ của doanh nghiệp" }
    ],
    correctAnswer: "C",
    type: 'multiple-choice'
  },
  {
    id: 107,
    text: "Thông tư số 142/2017/TT-BQP quy định về công tác ATVSLĐ trong Bộ Quốc phòng do cơ quan nào ban hành và vào ngày tháng năm nào?",
    options: [
      { id: "A", text: "Bộ Lao động - Thương binh và Xã hội, ngày 01/6/2017" },
      { id: "B", text: "Bộ Quốc phòng, ngày 29/5/2017" },
      { id: "C", text: "Tổng LĐLĐ Việt Nam, ngày 29/5/2017" },
      { id: "D", text: "Ban Công đoàn Quốc phòng, ngày 29/5/2017" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 108,
    text: "Theo anh, chị để bảo đảm ATVSLĐ tại nơi làm việc người sử dụng lao động phải trang bị, cấp phát cho người lao động những gì?",
    options: [
      { id: "A", text: "Trang cấp đầy đủ cho NLĐ các phương tiện bảo vệ cá nhân khi thực hiện công việc có yếu tố nguy hiểm." },
      { id: "B", text: "Trang cấp đầy đủ cho NLĐ các phương tiện bảo vệ cá nhân khi thực hiện công việc có yếu tố có hại." },
      { id: "C", text: "Trang bị các thiết bị ATVSLĐ tại nơi làm việc." },
      { id: "D", text: "Tất cả các đáp án trên." }
    ],
    correctAnswer: "D",
    type: 'multiple-choice'
  },
  {
    id: 109,
    text: "An toàn vệ sinh viên có nhiệm vụ nào sau đây?",
    options: [
      { id: "A", text: "Lập biên bản xử phạt người vi phạm quy định ATVSLĐ" },
      { id: "B", text: "Đôn đốc, nhắc nhở người lao động trong tổ, đội thực hiện quy định về ATVSLĐ" },
      { id: "C", text: "Quyết định dừng sản xuất khi phát hiện nguy cơ mất an toàn" },
      { id: "D", text: "Điều tra độc lập các tai nạn lao động xảy ra" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 110,
    text: "Thông tư số 06/2020/TT-BLĐTBXH ngày 20/8/2020 của Bộ LĐTB&XH quy định, những công việc dưới đây nằm trong Danh mục công việc có yêu cầu nghiêm ngặt về ATVSLĐ?",
    options: [
      { id: "A", text: "Làm việc trên cao cách mặt bằng làm việc từ 2 mét trở lên, trên sàn công tác di động, nơi cheo leo nguy hiểm." },
      { id: "B", text: "Công việc trên sông, trên biển, trên mặt nước, trên các nhà giàn, lặn, giám thị lặn; chế tạo, đóng, vận hành, sửa chữa, bảo dưỡng, kiểm tra máy, thiết bị trong hầm tàu, phương tiện thủy." },
      { id: "C", text: "Cả a và b." }
    ],
    correctAnswer: "C",
    type: 'multiple-choice'
  },
  {
    id: 111,
    text: "Theo QCVN 24:2016/BYT, mức tiếp xúc cho phép với tiếng ồn của người lao động tại nơi làm việc bình thường trong 8 giờ tại các cơ sở sản xuất không được vượt quá bao nhiêu decibel (dBA)?",
    options: [
      { id: "A", text: "80dBA" },
      { id: "B", text: "85dBA" },
      { id: "C", text: "90dB" },
      { id: "D", text: "95dB" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 112,
    text: "Nhóm giải pháp hiệu quả nhất để phòng chống bệnh nghề nghiệp là gì?",
    options: [
      { id: "A", text: "Các biện pháp kỹ thuật vệ sinh" },
      { id: "B", text: "Trang bị phương tiện bảo vệ cá nhân" },
      { id: "C", text: "Biện pháp kỹ thuật công nghệ, kiểm soát tại nguồn phát sinh" },
      { id: "D", text: "Các biện pháp y tế, tổ chức và quản lý lao động" }
    ],
    correctAnswer: "C",
    type: 'multiple-choice'
  },
  {
    id: 113,
    text: "Thông tư số 19/2016/TT-BYT ngày 30/6/2016 của Bộ Y tế quy định trong hoạt động sơ cấp cứu, đối với vị trí làm việc có sử dụng hóa chất độc hoặc chất gây ăn mòn phải trang bị gì trong khu vực làm việc?",
    options: [
      { id: "A", text: "Bông băng" },
      { id: "B", text: "Vòi tắm khẩn cấp" },
      { id: "C", text: "Cồn sát khuẩn" },
      { id: "D", text: "Betadine sát khuẩn" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 114,
    text: "Chương trình 342/CTr-BCĐ ngày 19/01/2026 của Ban Chỉ đạo ATVSLĐ, PCBNN Bộ Quốc phòng giai đoạn 2026-2030 xác định 100% đơn vị lao động, sản xuất phải xây dựng nội dung nào sau đây?",
    options: [
      { id: "A", text: "Kế hoạch huấn luyện quân sự" },
      { id: "B", text: "Phương án xử lý sự cố kỹ thuật gây mất ATVSLĐ nghiêm trọng" },
      { id: "C", text: "Kế hoạch tuyển dụng" },
      { id: "D", text: "Phương án tài chính" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 115,
    text: "Yếu tố sinh học gây bệnh nghề nghiệp?",
    options: [
      { id: "A", text: "Virus viêm gan B" },
      { id: "B", text: "Virus HIV" },
      { id: "C", text: "Vi khuẩn lao" },
      { id: "D", text: "Tất cả các yếu tố trên" }
    ],
    correctAnswer: "D",
    type: 'multiple-choice'
  },
  {
    id: 116,
    text: "Sơ cấp cứu tại nơi làm việc có tính chất gì?",
    options: [
      { id: "A", text: "Tính tạm thời" },
      { id: "B", text: "Tính chuyên môn cao và bắt buộc" },
      { id: "C", text: "Có tính trì hoãn" },
      { id: "D", text: "Có tính ổn định" }
    ],
    correctAnswer: "A",
    type: 'multiple-choice'
  },
  {
    id: 117,
    text: "Chỉ thị 100/CT-BQP ngày 29/12/2016 của Bộ Quốc phòng yêu cầu kết hợp Tháng hành động ATVSLĐ với nội dung nào trước đây?",
    options: [
      { id: "A", text: "Tuần lễ quốc gia về ATVSLĐ – PCCN" },
      { id: "B", text: "Ngày truyền thống ngành" },
      { id: "C", text: "Hội thao quân sự" },
      { id: "D", text: "Diễn tập khu vực phòng thủ" }
    ],
    correctAnswer: "A",
    type: 'multiple-choice'
  },
  {
    id: 118,
    text: "Theo Chương trình 342/CTr-BCĐ ngày 19/01/2026 của Ban Chỉ đạo ATVSLĐ, PCBNN Bộ Quốc phòng giai đoạn 2026-2030 xác định hằng năm phải giảm trên bao nhiêu % tần suất TNLĐ chết người trong các ngành có nguy cơ cao?",
    options: [
      { id: "A", text: "Trên 5%" },
      { id: "B", text: "Trên 7%" },
      { id: "C", text: "Trên 10%" },
      { id: "D", text: "Trên 15%" }
    ],
    correctAnswer: "A",
    type: 'multiple-choice'
  },
  {
    id: 119,
    text: "Theo Chương trình 342/CTr-BCĐ ngày 19/01/2026 của Ban Chỉ đạo ATVSLĐ, PCBNN Bộ Quốc phòng giai đoạn 2026-2030 xác định người làm công tác ATVSLĐ phải được huấn luyện tối thiểu:",
    options: [
      { id: "A", text: "01 lần/năm" },
      { id: "B", text: "01 lần/02 năm" },
      { id: "C", text: "02 lần/năm" },
      { id: "D", text: "01 lần/03 năm" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 120,
    text: "Nội dung nào sau đây là trách nhiệm của Công đoàn cơ sở?",
    options: [
      { id: "A", text: "Tổ chức khám sức khỏe định kỳ" },
      { id: "B", text: "Tuyên truyền, vận động người lao động chấp hành ATVSLĐ" },
      { id: "C", text: "Trả lương cho người lao động" },
      { id: "D", text: "Xây dựng hợp đồng lao động" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 121,
    text: "Theo Luật ATVSLĐ năm 2015, khi phát hiện nơi làm việc có nguy cơ đe dọa nghiêm trọng đến tính mạng NLĐ, công đoàn có quyền:",
    options: [
      { id: "A", text: "Tự ý đình chỉ toàn bộ hoạt động đơn vị" },
      { id: "B", text: "Yêu cầu tập thể, cá nhân có trách nhiệm thực hiện ngay biện pháp bảo đảm ATVSLĐ" },
      { id: "C", text: "Sa thải người vi phạm" },
      { id: "D", text: "Phạt tiền đơn vị" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  }
];

export const px4ArrangementQuestions: ArrangementQuestion[] = [
  {
    id: 122,
    text: "Trình bày 05 nhiệm vụ chủ yếu của An toàn vệ sinh viên theo quy định của Luật ATVSLĐ?",
    type: 'arrangement',
    items: [
      "(1) Đôn đốc, nhắc nhở người lao động chấp hành quy định ATVSLĐ.",
      "(2) Giám sát việc thực hiện tiêu chuẩn, quy chuẩn, nội quy, quy trình ATVSLĐ.",
      "(3) Phát hiện kịp thời nguy cơ, kiến nghị người có trách nhiệm khắc phục.",
      "(4) Tham gia điều tra tai nạn lao động xảy ra tại nơi làm việc.",
      "(5) Tham gia xây dựng nội quy, quy trình an toàn và kế hoạch ATVSLĐ."
    ]
  },
  {
    id: 123,
    text: "Nêu quy trình sơ cứu ban đầu khi gặp người bị điện giật?",
    type: 'arrangement',
    items: [
      "Bước 1: Ngắt ngay nguồn điện (cầu dao/CB) hoặc dùng vật không dẫn điện tách nạn nhân.",
      "Bước 2: Đặt nạn nhân nơi thoáng, kiểm tra hô hấp và nhịp tim.",
      "Bước 3: Nếu ngừng thở/tim: tiến hành CPR (ép tim + thổi ngạt) theo tỷ lệ 30:2.",
      "Bước 4: Giữ ấm, không di chuyển nếu nghi ngờ chấn thương cột sống.",
      "Bước 5: Gọi người hỗ trợ và đưa nạn nhân đến viện cấp cứu y tế ngay."
    ]
  },
  {
    id: 124,
    text: "Thế nào là 'làm việc an toàn' đối với công nhân trước khi bắt đầu ca sản xuất?",
    type: 'arrangement',
    items: [
      "1. Kiểm tra đầy đủ PPE trước khi làm việc (quần áo bảo hộ, găng tay, dụng cụ đồ theo ngành nghề thực hiện nhiệm vụ...).",
      "2. Nghe bàn giao ca, nắm rõ tình hình an toàn khu vực làm việc.",
      "3. Kiểm tra đồ nghề, thiết bị công việc được phân công.",
      "4. Kiểm tra vị trí làm việc, phát hiện nguy cơ bất thường.",
      "5. Chỉ được làm việc sau khi người chỉ huy ca xác nhận an toàn."
    ]
  },
  {
    id: 125,
    text: "Người lao động có quyền từ chối làm việc không? Trong trường hợp nào?",
    type: 'arrangement',
    items: [
      "1. Có quyền từ chối khi thấy rõ nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng tính mạng hoặc sức khỏe.",
      "2. Phải báo ngay với người phụ trách trực tiếp.",
      "3. Không bị coi là vi phạm kỷ luật lao động trong trường hợp này."
    ]
  },
  {
    id: 126,
    text: "Trình bày ý nghĩa và 3 tiêu chí đánh giá phong trào 'Xanh - Sạch - Đẹp' tại đơn vị?",
    type: 'arrangement',
    items: [
      "Ý nghĩa: Cải thiện môi trường lao động, ngăn ngừa TNLĐ, BNN, nâng cao năng suất và sức khỏe NLĐ.",
      "Tiêu chí XANH: Trồng, chăm sóc cây xanh; không gian sản xuất thông thoáng.",
      "Tiêu chí SẠCH: Vệ sinh nơi làm việc, xử lý rác thải, không ô nhiễm môi trường.",
      "Tiêu chí ĐẸP: Sắp xếp ngăn nắp, khẩu hiệu, biển báo rõ ràng, thẩm mỹ."
    ]
  }
];
