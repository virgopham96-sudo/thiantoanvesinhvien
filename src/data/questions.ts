export interface Question {
  id: number;
  text: string;
  type: 'multiple-choice';
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
}

export interface ArrangementQuestion {
  id: number;
  text: string;
  type: 'arrangement';
  items: string[];
}

export const multipleChoiceQuestions: Question[] = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
    text: "An toàn vệ sinh viên có quyền yêu cầu người phụ trách bộ phận sản xuất thực hiện các biện pháp đảm bảo an toàn trong trường hợp nào?",
    options: [
      { id: "A", text: "Khi được sự đồng ý của Giám đốc" },
      { id: "B", text: "Khi phát hiện nguy cơ gây tai nạn lao động, bệnh nghề nghiệp" },
      { id: "C", text: "Chỉ khi có văn bản kiến nghị của Công đoàn" },
      { id: "D", text: "Khi có sự chứng kiến của ít nhất 2 người lao động" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 10,
    text: "ATVSV được hưởng phụ cấp trách nhiệm bằng bao nhiêu phần trăm mức lương tối thiểu vùng theo quy định hiện hành?",
    options: [
      { id: "A", text: "Không nhỏ hơn 5%" },
      { id: "B", text: "Không nhỏ hơn 10%" },
      { id: "C", text: "Không nhỏ hơn 15%" },
      { id: "D", text: "Không nhỏ hơn 20%" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 11,
    text: "Khí mêtan (CH4) trong hầm lò có đặc điểm gì về tỷ trọng so với không khí?",
    options: [
      { id: "A", text: "Nặng hơn không khí, tích tụ ở nền lò" },
      { id: "B", text: "Nhẹ hơn không khí, tích tụ ở trần lò và nơi cao" },
      { id: "C", text: "Bằng trọng lượng không khí, phân bố đều" },
      { id: "D", text: "Không có tỷ trọng cố định" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 12,
    text: "Nồng độ khí CH4 trong không khí hầm lò ở ngưỡng nào thì có khả năng gây nổ?",
    options: [
      { id: "A", text: "Từ 1% đến 3%" },
      { id: "B", text: "Từ 5% đến 16%" },
      { id: "C", text: "Từ 20% đến 40%" },
      { id: "D", text: "Từ 50% đến 80%" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 13,
    text: "Khí CO (carbon monoxide) trong hầm lò nguy hiểm vì lý do gì?",
    options: [
      { id: "A", text: "Gây cháy nổ mạnh hơn khí CH4" },
      { id: "B", text: "Không màu, không mùi, gây ngộ độc máu nguy hiểm đến tính mạng" },
      { id: "C", text: "Có màu vàng đặc trưng, dễ phát hiện" },
      { id: "D", text: "Chỉ nguy hiểm khi nồng độ trên 50%" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 14,
    text: "Nguyên nhân chủ yếu gây bục nước trong khai thác than hầm lò là gì?",
    options: [
      { id: "A", text: "Máy bơm nước hoạt động kém hiệu quả" },
      { id: "B", text: "Khai thác vào vùng chứa nước áp lực cao, mưa lớn thấm qua các kẽ nứt địa tầng" },
      { id: "C", text: "Đường lò thông gió không đủ lớn" },
      { id: "D", text: "Chống giữ lò không đúng quy cách" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 15,
    text: "Bụi than trong hầm lò có nguy cơ gây ra bệnh nghề nghiệp nào phổ biến nhất?",
    options: [
      { id: "A", text: "Bệnh điếc nghề nghiệp" },
      { id: "B", text: "Bệnh bụi phổi than (pneumoconiosis)" },
      { id: "C", text: "Bệnh rung chuyển nghề nghiệp" },
      { id: "D", text: "Bệnh viêm khớp nghề nghiệp" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 16,
    text: "Mỏ than hầm lò được phân loại nguy hiểm về khí nổ dựa trên tiêu chí nào?",
    options: [
      { id: "A", text: "Chiều sâu khai thác" },
      { id: "B", text: "Lượng khí CH4 thoát ra trong 1 tấn than khai thác" },
      { id: "C", text: "Số lượng công nhân làm việc trong lò" },
      { id: "D", text: "Công suất thông gió của mỏ" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 17,
    text: "Hệ thống thông gió hầm lò có chức năng chính là gì?",
    options: [
      { id: "A", text: "Làm mát cho công nhân làm việc trong lò" },
      { id: "B", text: "Cung cấp đủ không khí sạch, pha loãng và đẩy khí độc hại, bụi than ra khỏi lò" },
      { id: "C", text: "Tạo áp suất dương ngăn nước thấm vào lò" },
      { id: "D", text: "Hỗ trợ hệ thống thoát nước trong lò" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 18,
    text: "Thiết bị đo khí cá nhân (máy đo khí) của công nhân hầm lò cần được kiểm tra trước ca làm việc theo nguyên tắc nào?",
    options: [
      { id: "A", text: "Kiểm tra 1 tuần/lần" },
      { id: "B", text: "Kiểm tra trước mỗi ca sản xuất, bảo đảm pin đầy và cảnh báo hoạt động tốt" },
      { id: "C", text: "Chỉ kiểm tra khi nghi ngờ có sự cố" },
      { id: "D", text: "Giao cho tổ trưởng kiểm tra thay" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 19,
    text: "Khi phát hiện nồng độ khí CH4 vượt ngưỡng cho phép trong đường lò, biện pháp xử lý đầu tiên cần thực hiện là gì?",
    options: [
      { id: "A", text: "Tiếp tục làm việc nhưng mang thêm mặt nạ phòng độc" },
      { id: "B", text: "Ngừng ngay mọi hoạt động sản xuất, cắt điện khu vực đó, tổ chức rút người và thông báo chỉ huy" },
      { id: "C", text: "Bật thêm quạt thông gió cục bộ" },
      { id: "D", text: "Chờ đến ca sau để báo cáo" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 20,
    text: "Phương tiện bảo hộ cá nhân (PPE) bắt buộc trang bị cho công nhân hầm lò gồm những loại nào?",
    options: [
      { id: "A", text: "Chỉ cần mũ cứng và đèn chiếu sáng" },
      { id: "B", text: "Mũ cứng, đèn lò cá nhân, ủng bảo hộ, găng tay, tự cứu hô hấp, quần áo bảo hộ" },
      { id: "C", text: "Mũ cứng, kính bảo hộ và khẩu trang" },
      { id: "D", text: "Quần áo bảo hộ và thiết bị đo khí" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 21,
    text: "Thiết bị bình tự cứu cá nhân trong hầm lò được sử dụng trong tình huống nào?",
    options: [
      { id: "A", text: "Khi làm việc trong điều kiện bụi nhiều" },
      { id: "B", text: "Khi xảy ra sự cố cháy nổ, thoát khí độc, để bảo vệ hô hấp trong quá trình thoát nạn" },
      { id: "C", text: "Khi thực hiện khoan nổ mìn" },
      { id: "D", text: "Khi mang vật liệu nổ vào trong lò" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 22,
    text: "Khi phát hiện người bị điện giật còn đang tiếp xúc với nguồn điện, việc đầu tiên cần làm là gì?",
    options: [
      { id: "A", text: "Dùng tay kéo nạn nhân ra khỏi nguồn điện ngay lập tức" },
      { id: "B", text: "Ngắt nguồn điện hoặc dùng vật không dẫn điện tách nạn nhân khỏi nguồn điện" },
      { id: "C", text: "Đổ nước lạnh lên người nạn nhân" },
      { id: "D", text: "Gọi điện báo cấp cứu rồi chờ đợi" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 23,
    text: "Phương pháp hô hấp nhân tạo thổi ngạt (miệng - miệng) thực hiện như thế nào?",
    options: [
      { id: "A", text: "Thổi 10 lần/phút, mỗi lần thổi mạnh liên tục" },
      { id: "B", text: "Ngửa đầu nạn nhân, bịt mũi, thổi 2 lần ban đầu, sau đó 10-12 lần/phút đều đặn" },
      { id: "C", text: "Thổi 20 lần/phút, không cần ngửa đầu" },
      { id: "D", text: "Chỉ thổi khi nạn nhân không có nhịp tim" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 24,
    text: "Ép tim ngoài lồng ngực trong hồi sinh tim phổi (CPR) thực hiện tại vị trí nào?",
    options: [
      { id: "A", text: "Vùng thượng vị (bụng trên)" },
      { id: "B", text: "Phần dưới xương ức, giữa lồng ngực" },
      { id: "C", text: "Vùng ngực trái, nơi tim đập" },
      { id: "D", text: "Bất kỳ vị trí nào trên lồng ngực" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 25,
    text: "Khi cần ga-rô (garrot) cầm máu, ga-rô được đặt cách vết thương bao nhiêu?",
    options: [
      { id: "A", text: "Sát ngay vết thương" },
      { id: "B", text: "Cách vết thương 2-5 cm về phía gần tim" },
      { id: "C", text: "Cách vết thương 10-15 cm về phía gần tim" },
      { id: "D", text: "Cách vết thương 20 cm về phía xa tim" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 26,
    text: "Khi phát hiện cháy trong hầm lò, thứ tự ưu tiên hành động đúng là?",
    options: [
      { id: "A", text: "Chữa cháy trước - Rút người sau - Báo động" },
      { id: "B", text: "Báo động ngay - Rút người ra an toàn - Cô lập khu cháy - Chữa cháy nếu có thể" },
      { id: "C", text: "Tiếp tục sản xuất - Chờ lệnh chỉ huy - Chữa cháy" },
      { id: "D", text: "Rút người - Đóng cửa lò - Không cần báo" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 27,
    text: "Phong trào 'Xanh - Sạch - Đẹp, bảo đảm an toàn vệ sinh lao động' do tổ chức nào phát động?",
    options: [
      { id: "A", text: "Bộ Lao động - Thương binh và Xã hội" },
      { id: "B", text: "Tổng Liên đoàn Lao động Việt Nam" },
      { id: "C", text: "Bộ Y tế" },
      { id: "D", text: "Bộ Tài nguyên và Môi trường" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 28,
    text: "Văn hóa an toàn tại nơi làm việc được hiểu là gì?",
    options: [
      { id: "A", text: "Tập hợp các biển báo, nội quy an toàn treo tại nơi làm việc" },
      { id: "B", text: "Tổng thể các giá trị, niềm tin, thái độ và hành vi của mọi cá nhân trong tổ chức liên quan đến an toàn lao động" },
      { id: "C", text: "Bộ quy tắc ứng xử giữa công nhân và quản lý về ATVSLĐ" },
      { id: "D", text: "Chương trình thi đua khen thưởng về an toàn" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 29,
    text: "Quy trình 'kiểm tra an toàn trước ca' trong khai thác than hầm lò yêu cầu ai thực hiện?",
    options: [
      { id: "A", text: "Chỉ riêng cán bộ an toàn của đơn vị" },
      { id: "B", text: "Tổ trưởng hoặc cán bộ chỉ huy ca, ATVSV phối hợp kiểm tra trước khi cho công nhân vào lò" },
      { id: "C", text: "Công nhân tự kiểm tra vị trí làm việc của mình" },
      { id: "D", text: "Chỉ do Phòng An toàn thực hiện định kỳ hàng tuần" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  },
  {
    id: 30,
    text: "Theo quy định ATVSLĐ, trước khi vào khu vực vừa nổ mìn trong hầm lò phải chờ ít nhất bao lâu để khí độc tan hết?",
    options: [
      { id: "A", text: "5 phút" },
      { id: "B", text: "Ít nhất 15 phút và sau khi kiểm tra chất lượng không khí đảm bảo an toàn" },
      { id: "C", text: "Chỉ cần quạt gió thổi qua là vào được ngay" },
      { id: "D", text: "30 phút bất kể điều kiện thông gió" }
    ],
    correctAnswer: "B",
    type: 'multiple-choice'
  }
];

export const arrangementQuestions: ArrangementQuestion[] = [
  {
    id: 31,
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
    id: 32,
    text: "Kể tên ít nhất 05 yếu tố nguy hiểm, có hại đặc trưng trong khai thác than hầm lò?",
    type: 'arrangement',
    items: [
      "(1) Khí độc và khí nổ: CH4, CO, H2S, CO2...",
      "(2) Bụi than, bụi đá gây bệnh bụi phổi nghề nghiệp.",
      "(3) Sập lò, sụt lún do áp lực địa tầng.",
      "(4) Bục nước, lũ lụt trong lò.",
      "(5) Điện giật từ hệ thống điện trong lò.",
      "(6) Nổ mìn, cháy nổ than, cháy khí.",
      "(7) Tiếng ồn và rung động từ máy móc thiết bị."
    ]
  },
  {
    id: 33,
    text: "Nêu quy trình sơ cứu ban đầu khi gặp người bị điện giật trong hầm lò?",
    type: 'arrangement',
    items: [
      "Bước 1: Ngắt ngay nguồn điện (cầu dao/CB) hoặc dùng vật không dẫn điện tách nạn nhân.",
      "Bước 2: Đặt nạn nhân nơi thoáng, kiểm tra hô hấp và nhịp tim.",
      "Bước 3: Nếu ngừng thở/tim: tiến hành CPR (ép tim + thổi ngạt) theo tỷ lệ 30:2.",
      "Bước 4: Giữ ấm, không di chuyển nếu nghi ngờ chấn thương cột sống.",
      "Bước 5: Gọi người hỗ trợ và đưa nạn nhân lên mặt đất cấp cứu y tế ngay."
    ]
  },
  {
    id: 34,
    text: "Thế nào là 'làm việc an toàn' đối với công nhân hầm lò trước khi bắt đầu ca sản xuất?",
    type: 'arrangement',
    items: [
      "1. Kiểm tra đầy đủ PPE trước khi xuống lò (mũ, đèn, tự cứu, ủng...).",
      "2. Nghe bàn giao ca, nắm rõ tình hình an toàn khu vực làm việc.",
      "3. Kiểm tra thiết bị đo khí cá nhân.",
      "4. Kiểm tra công trình chống giữ, phát hiện nguy cơ bất thường.",
      "5. Chỉ được làm việc sau khi người chỉ huy ca xác nhận an toàn."
    ]
  },
  {
    id: 35,
    text: "Người lao động có quyền từ chối làm việc không? Trong trường hợp nào?",
    type: 'arrangement',
    items: [
      "1. Có quyền từ chối khi thấy rõ nguy cơ xảy ra tai nạn lao động đe dọa nghiêm trọng tính mạng hoặc sức khỏe.",
      "2. Phải báo ngay với người phụ trách trực tiếp.",
      "3. Không bị coi là vi phạm kỷ luật lao động trong trường hợp này."
    ]
  },
  {
    id: 36,
    text: "Trình bày ý nghĩa và 3 tiêu chí đánh giá phong trào 'Xanh - Sạch - Đẹp' tại đơn vị?",
    type: 'arrangement',
    items: [
      "Ý nghĩa: Cải thiện môi trường lao động, ngăn ngừa TNLĐ, BNN, nâng cao năng suất và sức khỏe NLĐ.",
      "Tiêu chí XANH: Trồng, chăm sóc cây xanh; không gian sản xuất thông thoáng.",
      "Tiêu chí SẠCH: Vệ sinh nơi làm việc, xử lý rác thải, không ô nhiễm môi trường.",
      "Tiêu chí ĐẸP: Sắp xếp ngăn nắp, khẩu hiệu, biển báo rõ ràng, thẩm mỹ."
    ]
  },
  {
    id: 37,
    text: "Kể tên 03 loại bệnh nghề nghiệp phổ biến trong ngành khai thác than và biện pháp phòng ngừa chính?",
    type: 'arrangement',
    items: [
      "(1) Bệnh bụi phổi than (CWP): phòng bằng khẩu trang chuyên dụng, tưới nước dập bụi, kiểm soát nồng độ bụi.",
      "(2) Bệnh điếc nghề nghiệp: phòng bằng nút tai, chụp tai cách âm khi làm gần máy ồn.",
      "(3) Bệnh rung chuyển (vibration disease): phòng bằng găng tay chống rung, hạn chế thời gian tiếp xúc."
    ]
  },
  {
    id: 38,
    text: "Công đoàn cơ sở có vai trò gì trong công tác ATVSLĐ tại doanh nghiệp?",
    type: 'arrangement',
    items: [
      "1. Tham gia xây dựng, giám sát thực hiện kế hoạch ATVSLĐ.",
      "2. Tổ chức và quản lý mạng lưới ATVSV.",
      "3. Đại diện bảo vệ quyền, lợi ích hợp pháp của NLĐ khi bị TNLĐ, BNN.",
      "4. Phối hợp tổ chức Tháng hành động ATVSLĐ, hội thi ATVSV giỏi.",
      "5. Yêu cầu người SDLĐ thực hiện đầy đủ chính sách, chế độ ATVSLĐ."
    ]
  },
  {
    id: 39,
    text: "Nêu ít nhất 04 biện pháp phòng chống cháy nổ trong hầm lò than?",
    type: 'arrangement',
    items: [
      "(1) Kiểm soát chặt nguồn lửa, cấm mang thiết bị phát lửa (bật lửa, diêm) vào lò.",
      "(2) Quan trắc liên tục nồng độ khí CH4, cắt điện ngay khi vượt ngưỡng.",
      "(3) Sử dụng thiết bị điện, máy móc phòng nổ chuyên dụng.",
      "(4) Bố trí hệ thống chữa cháy, bình cứu hỏa tại các điểm xung yếu.",
      "(5) Đảm bảo thông gió đủ tiêu chuẩn, pha loãng khí nổ."
    ]
  },
  {
    id: 40,
    text: "Sau khi tổ chức Hội thi ATVSV giỏi cấp cơ sở, đơn vị cần thực hiện những công việc gì để báo cáo về Tổng công ty?",
    type: 'arrangement',
    items: [
      "1. Tổng kết, đánh giá kết quả Hội thi: số đội tham gia, xếp hạng, khen thưởng.",
      "2. Nhận xét, rút kinh nghiệm về tổ chức và nội dung Hội thi.",
      "3. Lập báo cáo kết quả gửi về TCT qua Phòng Chính trị trước ngày 30/5/2026.",
      "4. Vận động ĐVCĐ, NLĐ tích cực tham gia Hội thi cấp toàn quân."
    ]
  }
];
