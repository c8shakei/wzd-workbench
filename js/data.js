// ============================================================
// 数据层：词汇 / 语法 / 配置（由 extract_modular.js 从单文件抽取，按行定位 + JS 引擎校验）
// 通过普通 <script> 加载，声明为全局变量供 app.js 使用。
// ============================================================

var WORDS = [
  {
    "word": "streamline",
    "ipa": "/ˈstriːmlaɪn/",
    "pos": "v.",
    "meaning": "精简；使更高效",
    "example": "We streamlined the approval process to save time.",
    "exampleZh": "我们精简了审批流程以节省时间。"
  },
  {
    "word": "deadline",
    "ipa": "/ˈdedlaɪn/",
    "pos": "n.",
    "meaning": "截止日期",
    "example": "The report is due before the Friday deadline.",
    "exampleZh": "报告须在周五截止前提交。"
  },
  {
    "word": "coordinate",
    "ipa": "/koʊˈɔːrdɪneɪt/",
    "pos": "v.",
    "meaning": "协调；统筹",
    "example": "She coordinates the installation team on site.",
    "exampleZh": "她负责现场安装团队的协调。"
  },
  {
    "word": "feasible",
    "ipa": "/ˈfiːzəbl/",
    "pos": "adj.",
    "meaning": "可行的；办得到的",
    "example": "Is this two-week timeline feasible?",
    "exampleZh": "这两周的时间安排可行吗？"
  },
  {
    "word": "pending",
    "ipa": "/ˈpendɪŋ/",
    "pos": "adj.",
    "meaning": "待定的；未决的",
    "example": "The order is still pending approval.",
    "exampleZh": "该订单仍在等待审批。"
  },
  {
    "word": "milestone",
    "ipa": "/ˈmaɪlstoʊn/",
    "pos": "n.",
    "meaning": "里程碑；重要阶段",
    "example": "We reached a key milestone this week.",
    "exampleZh": "我们本周达成了一个关键里程碑。"
  },
  {
    "word": "clarify",
    "ipa": "/ˈklærəfaɪ/",
    "pos": "v.",
    "meaning": "澄清；说明",
    "example": "Please clarify the technical requirement.",
    "exampleZh": "请澄清这项技术要求。"
  },
  {
    "word": "leverage",
    "ipa": "/ˈlevərɪdʒ/",
    "pos": "v.",
    "meaning": "充分利用；撬动",
    "example": "We leveraged the existing CAD template.",
    "exampleZh": "我们充分利用了现有的 CAD 模板。"
  },
  {
    "word": "retrospective",
    "ipa": "/ˌretrəˈspektɪv/",
    "pos": "n.",
    "meaning": "回顾（会）",
    "example": "The weekly retrospective found bottlenecks.",
    "exampleZh": "周回顾会发现了流程瓶颈。"
  },
  {
    "word": "allocate",
    "ipa": "/ˈæləkeɪt/",
    "pos": "v.",
    "meaning": "分配；划拨",
    "example": "Allocate the budget to phase two.",
    "exampleZh": "把预算分配到第二阶段。"
  },
  {
    "word": "compliance",
    "ipa": "/kəmˈplaɪəns/",
    "pos": "n.",
    "meaning": "合规；遵守",
    "example": "Compliance with subsidy rules is required.",
    "exampleZh": "须符合补贴相关规定。"
  },
  {
    "word": "procure",
    "ipa": "/prəˈkjʊr/",
    "pos": "v.",
    "meaning": "采购；获取",
    "example": "We procured the elevator parts in time.",
    "exampleZh": "我们及时采购到了电梯部件。"
  }
];

var WORDS_EXTRA = [
  {
    "word": "hoistway",
    "ipa": "/ˈhɔɪstweɪ/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "井道",
    "example": "The hoistway must be measured before installation.",
    "exampleZh": "井道在安装前必须测量。"
  },
  {
    "word": "counterweight",
    "ipa": "/ˈkaʊntərweɪt/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "对重",
    "example": "The counterweight balances the elevator car.",
    "exampleZh": "对重平衡轿厢。"
  },
  {
    "word": "landing",
    "ipa": "/ˈlændɪŋ/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "层站",
    "example": "Passengers exit at each landing.",
    "exampleZh": "乘客在各层站出梯。"
  },
  {
    "word": "governor",
    "ipa": "/ˈɡʌvərnər/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "限速器",
    "example": "The governor stops the car in an overspeed event.",
    "exampleZh": "限速器在超速时制停车厢。"
  },
  {
    "word": "traction",
    "ipa": "/ˈtrækʃən/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "曳引",
    "example": "Traction elevators use ropes and a sheave.",
    "exampleZh": "曳引电梯使用钢丝绳与曳引轮。"
  },
  {
    "word": "pit",
    "ipa": "/pɪt/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "底坑",
    "example": "Inspect the pit for water and debris.",
    "exampleZh": "检查底坑有无积水与杂物。"
  },
  {
    "word": "car",
    "ipa": "/kɑːr/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "轿厢",
    "example": "The car capacity is 1000 kg.",
    "exampleZh": "轿厢载重量为1000公斤。"
  },
  {
    "word": "sill",
    "ipa": "/sɪl/",
    "pos": "n.",
    "cat": "pro",
    "meaning": "地坎",
    "example": "The door sill must be flush with the floor.",
    "exampleZh": "门地坎应与地平齐。"
  },
  {
    "word": "commute",
    "ipa": "/kəˈmjuːt/",
    "pos": "n./v.",
    "cat": "daily",
    "meaning": "通勤",
    "example": "I commute by subway every morning.",
    "exampleZh": "我每天早晨坐地铁通勤。"
  },
  {
    "word": "neighbor",
    "ipa": "/ˈneɪbər/",
    "pos": "n.",
    "cat": "daily",
    "meaning": "邻居",
    "example": "My neighbor is also an intern.",
    "exampleZh": "我的邻居也是实习生。"
  },
  {
    "word": "recipe",
    "ipa": "/ˈresəpi/",
    "pos": "n.",
    "cat": "daily",
    "meaning": "菜谱",
    "example": "She shared a simple recipe for noodles.",
    "exampleZh": "她分享了一个简单的面条做法。"
  },
  {
    "word": "relax",
    "ipa": "/rɪˈlæks/",
    "pos": "v.",
    "cat": "daily",
    "meaning": "放松",
    "example": "Let's relax with some music.",
    "exampleZh": "我们听音乐放松一下。"
  },
  {
    "word": "hobby",
    "ipa": "/ˈhɑːbi/",
    "pos": "n.",
    "cat": "daily",
    "meaning": "爱好",
    "example": "Reading is my favorite hobby.",
    "exampleZh": "阅读是我最喜欢的爱好。"
  }
];

var CAT = {
  "streamline": "office",
  "deadline": "office",
  "coordinate": "office",
  "feasible": "office",
  "pending": "office",
  "milestone": "office",
  "clarify": "office",
  "leverage": "office",
  "retrospective": "office",
  "allocate": "office",
  "compliance": "office",
  "procure": "office"
};

// OFFLINE_EXTRA 由 5 个分片合并而成（见 js/dict_part*.js，加载顺序在其之后）
var OFFLINE_EXTRA = OFFLINE_EXTRA_1.concat(OFFLINE_EXTRA_2.concat(OFFLINE_EXTRA_3.concat(OFFLINE_EXTRA_4.concat(OFFLINE_EXTRA_5))));

var CET6_WORDS = [
  {
    "word": "abandon",
    "ipa": "/əˈbændən/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "抛弃；放弃",
    "example": "They had to abandon the plan.",
    "exampleZh": "他们不得不放弃这个计划。"
  },
  {
    "word": "abolish",
    "ipa": "/əˈbɒlɪʃ/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "废除；废止",
    "example": "Slavery was abolished in the 19th century.",
    "exampleZh": "奴隶制于19世纪被废除。"
  },
  {
    "word": "abstract",
    "ipa": "/ˈæbstrækt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "抽象的；纯理论的",
    "example": "This concept is too abstract for beginners.",
    "exampleZh": "这个概念对初学者来说太抽象。"
  },
  {
    "word": "abundant",
    "ipa": "/əˈbʌndənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "丰富的；充裕的",
    "example": "The region has abundant rainfall.",
    "exampleZh": "该地区降雨充沛。"
  },
  {
    "word": "accelerate",
    "ipa": "/əkˈseləreɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "使加速；加快",
    "example": "The car accelerated to overtake.",
    "exampleZh": "汽车加速以超车。"
  },
  {
    "word": "accommodate",
    "ipa": "/əˈkɒmədeɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "容纳；适应",
    "example": "The hotel can accommodate 200 guests.",
    "exampleZh": "这家酒店可容纳200名客人。"
  },
  {
    "word": "accomplish",
    "ipa": "/əˈkʌmplɪʃ/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "完成；实现",
    "example": "We accomplished the task on time.",
    "exampleZh": "我们按时完成了任务。"
  },
  {
    "word": "accumulate",
    "ipa": "/əˈkjuːmjəleɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "积累；积聚",
    "example": "Dust accumulates on the shelf.",
    "exampleZh": "灰尘在架子上逐渐积聚。"
  },
  {
    "word": "accurate",
    "ipa": "/ˈækjərət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "准确的；精确的",
    "example": "Please give an accurate figure.",
    "exampleZh": "请给出一个准确的数字。"
  },
  {
    "word": "acknowledge",
    "ipa": "/əkˈnɒlɪdʒ/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "承认；确认收到",
    "example": "He acknowledged his mistake.",
    "exampleZh": "他承认了自己的错误。"
  },
  {
    "word": "acquire",
    "ipa": "/əˈkwaɪər/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "获得；习得",
    "example": "She acquired fluency in French.",
    "exampleZh": "她练就了流利的法语。"
  },
  {
    "word": "adequate",
    "ipa": "/ˈædɪkwət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "充足的；适当的",
    "example": "The current supply is not adequate.",
    "exampleZh": "目前的供应并不充足。"
  },
  {
    "word": "adjacent",
    "ipa": "/əˈdʒeɪsənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "邻近的；毗连的",
    "example": "The two buildings are adjacent.",
    "exampleZh": "这两栋楼彼此相邻。"
  },
  {
    "word": "adjust",
    "ipa": "/əˈdʒʌst/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "调整；使适应",
    "example": "Adjust the seat to your height.",
    "exampleZh": "把座位调到适合你身高的位置。"
  },
  {
    "word": "administer",
    "ipa": "/ədˈmɪnɪstər/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "管理；施行",
    "example": "The nurse administered the drug.",
    "exampleZh": "护士给病人用药。"
  },
  {
    "word": "adolescent",
    "ipa": "/ˌædəˈlesənt/",
    "pos": "n./adj.",
    "cat": "cet6",
    "meaning": "青少年（的）",
    "example": "Adolescents need proper guidance.",
    "exampleZh": "青少年需要恰当的引导。"
  },
  {
    "word": "adverse",
    "ipa": "/ˈædvɜːrs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "不利的；有害的",
    "example": "The weather had an adverse effect.",
    "exampleZh": "天气造成了不利影响。"
  },
  {
    "word": "advocate",
    "ipa": "/ˈædvəkeɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "提倡；拥护",
    "example": "He advocates early education.",
    "exampleZh": "他提倡早期教育。"
  },
  {
    "word": "aesthetic",
    "ipa": "/iːsˈθetɪk/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "审美的；美学的",
    "example": "The design has aesthetic value.",
    "exampleZh": "这个设计具有审美价值。"
  },
  {
    "word": "allocate",
    "ipa": "/ˈæləkeɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "分配；分派",
    "example": "Funds were allocated to research.",
    "exampleZh": "资金被分配用于研究。"
  },
  {
    "word": "ambiguous",
    "ipa": "/æmˈbɪɡjuəs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "模棱两可的；含糊的",
    "example": "His answer was ambiguous.",
    "exampleZh": "他的回答含糊不清。"
  },
  {
    "word": "ambitious",
    "ipa": "/æmˈbɪʃəs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "有雄心的；有野心的",
    "example": "She has an ambitious goal.",
    "exampleZh": "她有一个雄心勃勃的目标。"
  },
  {
    "word": "amplify",
    "ipa": "/ˈæmplɪfaɪ/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "放大；增强",
    "example": "The microphone amplifies sound.",
    "exampleZh": "麦克风放大声音。"
  },
  {
    "word": "analogy",
    "ipa": "/əˈnælədʒi/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "类比；相似",
    "example": "He explained it by analogy.",
    "exampleZh": "他通过类比来解释它。"
  },
  {
    "word": "analyze",
    "ipa": "/ˈænəlaɪz/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "分析；解析",
    "example": "We analyzed the survey data.",
    "exampleZh": "我们分析了调查数据。"
  },
  {
    "word": "anticipate",
    "ipa": "/ænˈtɪsɪpeɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "预期；预料",
    "example": "We anticipate a rise in demand.",
    "exampleZh": "我们预期需求会上升。"
  },
  {
    "word": "apparent",
    "ipa": "/əˈpærənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "明显的；表面上的",
    "example": "The cause of the fault is apparent.",
    "exampleZh": "故障的原因很明显。"
  },
  {
    "word": "appeal",
    "ipa": "/əˈpiːl/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "呼吁；吸引",
    "example": "The idea appeals to young people.",
    "exampleZh": "这个想法吸引年轻人。"
  },
  {
    "word": "appreciate",
    "ipa": "/əˈpriːʃieɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "欣赏；感激",
    "example": "I appreciate your timely help.",
    "exampleZh": "我感激你及时的帮助。"
  },
  {
    "word": "appropriate",
    "ipa": "/əˈproʊpriət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "适当的；恰当的",
    "example": "Choose an appropriate response.",
    "exampleZh": "选择一个恰当的回应。"
  },
  {
    "word": "arbitrary",
    "ipa": "/ˈɑːrbɪtreri/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "武断的；任意的",
    "example": "The decision seemed arbitrary.",
    "exampleZh": "这个决定似乎是武断的。"
  },
  {
    "word": "articulate",
    "ipa": "/ɑːrˈtɪkjuleɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "清晰表达",
    "example": "She articulated her views clearly.",
    "exampleZh": "她清晰地表达了自己的观点。"
  },
  {
    "word": "ascertain",
    "ipa": "/ˌæsərˈteɪn/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "查明；确定",
    "example": "We must ascertain the facts.",
    "exampleZh": "我们必须查明事实。"
  },
  {
    "word": "ascribe",
    "ipa": "/əˈskraɪb/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "把…归因于",
    "example": "He ascribed the success to luck.",
    "exampleZh": "他把成功归因于运气。"
  },
  {
    "word": "assess",
    "ipa": "/əˈses/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "评估；评定",
    "example": "They assessed the financial risk.",
    "exampleZh": "他们评估了财务风险。"
  },
  {
    "word": "assign",
    "ipa": "/əˈsaɪn/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "分配；指派",
    "example": "I was assigned the report.",
    "exampleZh": "我被指派写这份报告。"
  },
  {
    "word": "assume",
    "ipa": "/əˈsuːm/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "假定；承担",
    "example": "We assume the data is correct.",
    "exampleZh": "我们假定数据是正确的。"
  },
  {
    "word": "assure",
    "ipa": "/əˈʃʊr/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "向…保证；使确信",
    "example": "He assured me of his support.",
    "exampleZh": "他向我保证会给予支持。"
  },
  {
    "word": "attain",
    "ipa": "/əˈteɪn/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "达到；获得",
    "example": "She attained her career goal.",
    "exampleZh": "她实现了职业目标。"
  },
  {
    "word": "attribute",
    "ipa": "/əˈtrɪbjuːt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "把…归因于",
    "example": "We attribute the delay to weather.",
    "exampleZh": "我们把延误归因于天气。"
  },
  {
    "word": "authorize",
    "ipa": "/ˈɔːθəraɪz/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "授权；批准",
    "example": "Only the manager can authorize it.",
    "exampleZh": "只有经理才能授权此事。"
  },
  {
    "word": "automatic",
    "ipa": "/ˌɔːtəˈmætɪk/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "自动的",
    "example": "The gate is fully automatic.",
    "exampleZh": "这扇门是完全自动的。"
  },
  {
    "word": "avert",
    "ipa": "/əˈvɜːrt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "避免；转移",
    "example": "We averted a major crisis.",
    "exampleZh": "我们避免了一场重大危机。"
  },
  {
    "word": "bankrupt",
    "ipa": "/ˈbæŋkrʌpt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "破产的",
    "example": "The firm went bankrupt last year.",
    "exampleZh": "这家公司去年破产了。"
  },
  {
    "word": "behalf",
    "ipa": "/bɪˈhæf/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "利益；代表",
    "example": "He spoke on my behalf.",
    "exampleZh": "他代表我发言。"
  },
  {
    "word": "bias",
    "ipa": "/ˈbaɪəs/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "偏见；偏心",
    "example": "The report shows a clear bias.",
    "exampleZh": "报告显示出明显的偏见。"
  },
  {
    "word": "bizarre",
    "ipa": "/bɪˈzɑːr/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "奇异的；怪诞的",
    "example": "The story is utterly bizarre.",
    "exampleZh": "这个故事荒诞不经。"
  },
  {
    "word": "boost",
    "ipa": "/buːst/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "促进；提升",
    "example": "The policy boosted local growth.",
    "exampleZh": "该政策促进了本地增长。"
  },
  {
    "word": "brilliant",
    "ipa": "/ˈbrɪljənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "卓越的；明亮的",
    "example": "She had a brilliant idea.",
    "exampleZh": "她有个绝妙的主意。"
  },
  {
    "word": "bulk",
    "ipa": "/bʌlk/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "主体；大部分",
    "example": "The bulk of the work is done.",
    "exampleZh": "大部分工作已完成。"
  },
  {
    "word": "comprehensive",
    "ipa": "/ˌkɒmprɪˈhensɪv/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "综合的；全面的",
    "example": "We need a comprehensive plan.",
    "exampleZh": "我们需要一份全面的计划。"
  },
  {
    "word": "compulsory",
    "ipa": "/kəmˈpʌlsəri/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "强制的；义务的",
    "example": "Education is compulsory for children.",
    "exampleZh": "对儿童而言教育是必要的。"
  },
  {
    "word": "concrete",
    "ipa": "/ˈkɒŋkriːt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "具体的；实在的",
    "example": "Give me a concrete example.",
    "exampleZh": "给我一个具体的例子。"
  },
  {
    "word": "consequence",
    "ipa": "/ˈkɒnsɪkwəns/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "后果；结果",
    "example": "Face the consequence of your act.",
    "exampleZh": "为你行为的后果负责。"
  },
  {
    "word": "constitute",
    "ipa": "/ˈkɒnstɪtjuːt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "构成；组成",
    "example": "Twelve months constitute a year.",
    "exampleZh": "十二个月构成一年。"
  },
  {
    "word": "contemporary",
    "ipa": "/kənˈtemprəri/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "当代的；同时代的",
    "example": "Contemporary art is diverse.",
    "exampleZh": "当代艺术是多元的。"
  },
  {
    "word": "contribute",
    "ipa": "/kənˈtrɪbjuːt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "贡献；捐助",
    "example": "He contributed to the project.",
    "exampleZh": "他为这个项目作出了贡献。"
  },
  {
    "word": "controversial",
    "ipa": "/ˌkɒntrəˈvɜːrʃl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "有争议的",
    "example": "It is a controversial topic.",
    "exampleZh": "这是一个有争议的话题。"
  },
  {
    "word": "crucial",
    "ipa": "/ˈkruːʃl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "至关重要的",
    "example": "Timing is crucial to success.",
    "exampleZh": "时机对成功至关重要。"
  },
  {
    "word": "cumulative",
    "ipa": "/ˈkjuːmjələtɪv/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "累积的；渐增的",
    "example": "The effect is cumulative.",
    "exampleZh": "这种影响是累积性的。"
  },
  {
    "word": "deliberate",
    "ipa": "/dɪˈlɪbərət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "故意的；深思熟虑的",
    "example": "It was a deliberate mistake.",
    "exampleZh": "那是故意犯的错误。"
  },
  {
    "word": "demonstrate",
    "ipa": "/ˈdemənstreɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "证明；演示",
    "example": "The test demonstrates the theory.",
    "exampleZh": "实验证明了该理论。"
  },
  {
    "word": "distinct",
    "ipa": "/dɪˈstɪŋkt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "明显的；不同的",
    "example": "These two issues are distinct.",
    "exampleZh": "这两个问题截然不同。"
  },
  {
    "word": "distribute",
    "ipa": "/dɪˈstrɪbjuːt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "分配；分发",
    "example": "Aid was distributed to residents.",
    "exampleZh": "援助物资被分发给居民。"
  },
  {
    "word": "diverse",
    "ipa": "/daɪˈvɜːrs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "多样的；不同的",
    "example": "The team is culturally diverse.",
    "exampleZh": "这个团队具有多元文化背景。"
  },
  {
    "word": "dominant",
    "ipa": "/ˈdɒmɪnənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "占主导的；支配的",
    "example": "English is dominant online.",
    "exampleZh": "英语在互联网上占主导。"
  },
  {
    "word": "elaborate",
    "ipa": "/ɪˈlæbərət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "精心制作的；详尽的",
    "example": "She gave an elaborate explanation.",
    "exampleZh": "她给出了详尽的解释。"
  },
  {
    "word": "eliminate",
    "ipa": "/ɪˈlɪmɪneɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "消除；淘汰",
    "example": "We must eliminate errors.",
    "exampleZh": "我们必须消除错误。"
  },
  {
    "word": "emphasize",
    "ipa": "/ˈemfəsaɪz/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "强调；着重",
    "example": "He emphasized the deadline.",
    "exampleZh": "他强调了截止日期。"
  },
  {
    "word": "enhance",
    "ipa": "/ɪnˈhɑːns/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "提高；增强",
    "example": "Good sleep enhances memory.",
    "exampleZh": "良好的睡眠能增强记忆力。"
  },
  {
    "word": "enormous",
    "ipa": "/ɪˈnɔːrməs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "巨大的；庞大的",
    "example": "The cost was enormous.",
    "exampleZh": "成本极其高昂。"
  },
  {
    "word": "evident",
    "ipa": "/ˈevɪdənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "明显的；明白的",
    "example": "The benefit is evident.",
    "exampleZh": "益处是显而易见的。"
  },
  {
    "word": "explicit",
    "ipa": "/ɪkˈsplɪsɪt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "明确的；清楚的",
    "example": "Give explicit instructions.",
    "exampleZh": "给出明确的指示。"
  },
  {
    "word": "exploit",
    "ipa": "/ɪkˈsplɔɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "开发；利用；剥削",
    "example": "They exploit renewable energy.",
    "exampleZh": "他们开发利用可再生能源。"
  },
  {
    "word": "facilitate",
    "ipa": "/fəˈsɪlɪteɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "促进；使便利",
    "example": "The app facilitates learning.",
    "exampleZh": "这款应用让学习更便利。"
  },
  {
    "word": "feasible",
    "ipa": "/ˈfiːzəbl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "可行的；可能的",
    "example": "Is the plan feasible?",
    "exampleZh": "这个计划可行吗？"
  },
  {
    "word": "fluctuate",
    "ipa": "/ˈflʌktʃueɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "波动；起伏",
    "example": "Prices fluctuate daily.",
    "exampleZh": "价格每天波动。"
  },
  {
    "word": "formulate",
    "ipa": "/ˈfɔːrmjuleɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "制定；系统地阐述",
    "example": "We formulated a strategy.",
    "exampleZh": "我们制定了一项策略。"
  },
  {
    "word": "fundamental",
    "ipa": "/ˌfʌndəˈmentl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "基本的；根本的",
    "example": "Trust is fundamental to teams.",
    "exampleZh": "信任是团队的根本。"
  },
  {
    "word": "generate",
    "ipa": "/ˈdʒenəreɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "产生；生成",
    "example": "The plant generates power.",
    "exampleZh": "这座工厂发电。"
  },
  {
    "word": "genuine",
    "ipa": "/ˈdʒenjuɪn/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "真正的；真诚的",
    "example": "She showed genuine concern.",
    "exampleZh": "她表现出真诚的关切。"
  },
  {
    "word": "guarantee",
    "ipa": "/ˌɡærənˈtiː/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "保证；担保",
    "example": "We guarantee the quality.",
    "exampleZh": "我们保证质量。"
  },
  {
    "word": "homogeneous",
    "ipa": "/ˌhɒməˈdʒiːniəs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "同质的；均匀的",
    "example": "The group is homogeneous.",
    "exampleZh": "这个群体是同质的。"
  },
  {
    "word": "hypothesis",
    "ipa": "/haɪˈpɒθəsɪs/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "假说；前提",
    "example": "Test your hypothesis first.",
    "exampleZh": "先检验你的假说。"
  },
  {
    "word": "implement",
    "ipa": "/ˈɪmplɪment/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "实施；执行",
    "example": "We implemented the reform.",
    "exampleZh": "我们实施了改革。"
  },
  {
    "word": "inevitable",
    "ipa": "/ɪnˈevɪtəbl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "不可避免的",
    "example": "Change is inevitable.",
    "exampleZh": "变化不可避免。"
  },
  {
    "word": "infrastructure",
    "ipa": "/ˈɪnfrəstrʌktʃər/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "基础设施",
    "example": "Transport infrastructure improved.",
    "exampleZh": "交通基础设施改善了。"
  },
  {
    "word": "inherent",
    "ipa": "/ɪnˈhɪrənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "固有的；内在的",
    "example": "Risk is inherent in trading.",
    "exampleZh": "风险是交易固有的。"
  },
  {
    "word": "innovation",
    "ipa": "/ˌɪnəˈveɪʃn/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "创新；革新",
    "example": "Innovation drives growth.",
    "exampleZh": "创新推动增长。"
  },
  {
    "word": "integrate",
    "ipa": "/ˈɪntɪɡreɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "使融入；整合",
    "example": "Integrate the new system.",
    "exampleZh": "把新系统整合进来。"
  },
  {
    "word": "intrinsic",
    "ipa": "/ɪnˈtrɪnzɪk/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "固有的；本质的",
    "example": "It has intrinsic value.",
    "exampleZh": "它有内在价值。"
  },
  {
    "word": "legitimate",
    "ipa": "/lɪˈdʒɪtɪmət/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "合法的；合理的",
    "example": "It is a legitimate concern.",
    "exampleZh": "这是一个合理的担忧。"
  },
  {
    "word": "manipulate",
    "ipa": "/məˈnɪpjuleɪt/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "操纵；熟练操作",
    "example": "Do not manipulate the data.",
    "exampleZh": "不要篡改数据。"
  },
  {
    "word": "mature",
    "ipa": "/məˈtʃʊr/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "成熟的",
    "example": "The market is mature.",
    "exampleZh": "这个市场已经成熟。"
  },
  {
    "word": "negligible",
    "ipa": "/ˈneɡlɪdʒəbl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "可忽略的；微不足道的",
    "example": "The error is negligible.",
    "exampleZh": "这个误差可忽略不计。"
  },
  {
    "word": "notion",
    "ipa": "/ˈnoʊʃn/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "概念；想法",
    "example": "He has a strange notion.",
    "exampleZh": "他有个奇怪的想法。"
  },
  {
    "word": "objective",
    "ipa": "/əbˈdʒektɪv/",
    "pos": "n./adj.",
    "cat": "cet6",
    "meaning": "目标；客观的",
    "example": "Stay objective in review.",
    "exampleZh": "评审时保持客观。"
  },
  {
    "word": "paradigm",
    "ipa": "/ˈpærədaɪm/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "范式；模范",
    "example": "A new paradigm emerged.",
    "exampleZh": "一种新的范式出现了。"
  },
  {
    "word": "phenomenon",
    "ipa": "/fəˈnɒmɪnən/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "现象",
    "example": "This is a natural phenomenon.",
    "exampleZh": "这是一种自然现象。"
  },
  {
    "word": "potential",
    "ipa": "/pəˈtenʃl/",
    "pos": "adj./n.",
    "cat": "cet6",
    "meaning": "潜在的；潜力",
    "example": "The plan has great potential.",
    "exampleZh": "这个计划潜力巨大。"
  },
  {
    "word": "predominant",
    "ipa": "/prɪˈdɒmɪnənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "占主导的；主要的",
    "example": "The predominant view changed.",
    "exampleZh": "主流观点改变了。"
  },
  {
    "word": "preliminary",
    "ipa": "/prɪˈlɪmɪneri/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "初步的；预备的",
    "example": "We held a preliminary talk.",
    "exampleZh": "我们举行了初步会谈。"
  },
  {
    "word": "prevalent",
    "ipa": "/ˈprevələnt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "普遍的；盛行的",
    "example": "This view is prevalent.",
    "exampleZh": "这种观点很普遍。"
  },
  {
    "word": "prioritize",
    "ipa": "/praɪˈɒrətaɪz/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "优先处理",
    "example": "Prioritize the urgent tasks.",
    "exampleZh": "优先处理紧急任务。"
  },
  {
    "word": "profound",
    "ipa": "/prəˈfaʊnd/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "深刻的；深远的",
    "example": "It had a profound impact.",
    "exampleZh": "它产生了深远的影响。"
  },
  {
    "word": "prominent",
    "ipa": "/ˈprɒmɪnənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "突出的；杰出的",
    "example": "She is a prominent expert.",
    "exampleZh": "她是一位杰出的专家。"
  },
  {
    "word": "prompt",
    "ipa": "/prɒmpt/",
    "pos": "v./adj.",
    "cat": "cet6",
    "meaning": "促使；迅速的",
    "example": "The crisis prompted reform.",
    "exampleZh": "危机促使了改革。"
  },
  {
    "word": "radical",
    "ipa": "/ˈrædɪkl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "根本的；激进的",
    "example": "A radical change is needed.",
    "exampleZh": "需要进行根本性的改变。"
  },
  {
    "word": "random",
    "ipa": "/ˈrændəm/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "随机的；任意的",
    "example": "Pick a random sample.",
    "exampleZh": "抽取一个随机样本。"
  },
  {
    "word": "readily",
    "ipa": "/ˈredɪli/",
    "pos": "adv.",
    "cat": "cet6",
    "meaning": "容易地；乐意地",
    "example": "The data is readily available.",
    "exampleZh": "这些数据很容易获取。"
  },
  {
    "word": "robust",
    "ipa": "/rəʊˈbʌst/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "强健的；稳健的",
    "example": "We need a robust system.",
    "exampleZh": "我们需要一个稳健的系统。"
  },
  {
    "word": "spontaneous",
    "ipa": "/spɒnˈteɪniəs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "自发的；自然的",
    "example": "Their applause was spontaneous.",
    "exampleZh": "他们的掌声是自发的。"
  },
  {
    "word": "subsequent",
    "ipa": "/ˈsʌbsɪkwənt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "随后的；后来的",
    "example": "Subsequent tests confirmed it.",
    "exampleZh": "随后的测试证实了这一点。"
  },
  {
    "word": "substitute",
    "ipa": "/ˈsʌbstɪtjuːt/",
    "pos": "v./n.",
    "cat": "cet6",
    "meaning": "替代（品）",
    "example": "Use oil as a substitute.",
    "exampleZh": "用油作为替代品。"
  },
  {
    "word": "sufficient",
    "ipa": "/səˈfɪʃnt/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "足够的；充分的",
    "example": "Is the evidence sufficient?",
    "exampleZh": "证据充分吗？"
  },
  {
    "word": "theoretical",
    "ipa": "/ˌθɪəˈretɪkl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "理论的",
    "example": "It is a theoretical model.",
    "exampleZh": "这是一个理论模型。"
  },
  {
    "word": "threshold",
    "ipa": "/ˈθreʃhoʊld/",
    "pos": "n.",
    "cat": "cet6",
    "meaning": "门槛；临界值",
    "example": "We passed the threshold.",
    "exampleZh": "我们跨过了门槛。"
  },
  {
    "word": "tremendous",
    "ipa": "/trəˈmendəs/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "巨大的；极好的",
    "example": "We made tremendous progress.",
    "exampleZh": "我们取得了巨大进步。"
  },
  {
    "word": "undergo",
    "ipa": "/ˌʌndərˈɡoʊ/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "经历；承受",
    "example": "The city underwent change.",
    "exampleZh": "这座城市经历了变革。"
  },
  {
    "word": "underlying",
    "ipa": "/ˌʌndərˈlaɪɪŋ/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "潜在的；根本的",
    "example": "Address the underlying cause.",
    "exampleZh": "解决根本的原因。"
  },
  {
    "word": "utilize",
    "ipa": "/ˈjuːtəlaɪz/",
    "pos": "v.",
    "cat": "cet6",
    "meaning": "利用；使用",
    "example": "Utilize the available tools.",
    "exampleZh": "利用可用的工具。"
  },
  {
    "word": "vague",
    "ipa": "/veɪɡ/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "模糊的；含糊的",
    "example": "His description was vague.",
    "exampleZh": "他的描述含糊不清。"
  },
  {
    "word": "versatile",
    "ipa": "/ˈvɜːrsətl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "多才多艺的；多功能的",
    "example": "It is a versatile tool.",
    "exampleZh": "这是一个多功能的工具。"
  },
  {
    "word": "virtual",
    "ipa": "/ˈvɜːrtʃuəl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "虚拟的；实质上的",
    "example": "We met in a virtual room.",
    "exampleZh": "我们在一个虚拟空间里见面。"
  },
  {
    "word": "vital",
    "ipa": "/ˈvaɪtl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "至关重要的；生命的",
    "example": "Sleep is vital to health.",
    "exampleZh": "睡眠对健康至关重要。"
  },
  {
    "word": "voluntary",
    "ipa": "/ˈvɒləntri/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "自愿的；志愿的",
    "example": "It was a voluntary act.",
    "exampleZh": "这是一项自愿的行为。"
  },
  {
    "word": "vulnerable",
    "ipa": "/ˈvʌlnərəbl/",
    "pos": "adj.",
    "cat": "cet6",
    "meaning": "脆弱的；易受伤害的",
    "example": "Children are vulnerable.",
    "exampleZh": "儿童是脆弱的。"
  }
];

var CAT_LABEL = {
  "pro": "电梯专业",
  "office": "办公",
  "daily": "日常",
  "cet6": "六级"
};

var WORD_BATCH = 10;

var CET6_GRAMMAR = [
  {
    "topic": "过去完成时 had done 的用法",
    "cat": "tense",
    "rule": "表示在过去某一时间或动作之前已经完成的动作（“过去的过去”），常与 by / before / when 引导的过去时间连用。",
    "right": "By the time we arrived, the meeting had already started.",
    "wrong": "By the time we arrived, the meeting has already started. （arrived 为过去时，“已经开始”在其前，须用过去完成时）",
    "tip": "看见 <b>by + 过去时间</b> 或 <b>before/when + 过去动作</b>，优先想 had done。"
  },
  {
    "topic": "将来完成时 will have done",
    "cat": "tense",
    "rule": "表示在将来某一时间之前会完成的动作，常与 by + 将来时间、by the time + 一般现在时连用。",
    "right": "I will have finished the report by Friday.",
    "wrong": "I will finish the report by Friday. （若强调“到周五前已完成”，用将来完成时 will have finished）",
    "tip": "<b>by + 将来时间点</b> → will have done。"
  },
  {
    "topic": "位移动词现在进行时表将来",
    "cat": "tense",
    "rule": "go / come / leave / arrive / start 等位移动词用现在进行时表示已计划好的将来安排。",
    "right": "He is leaving for Shanghai tomorrow morning.",
    "wrong": "He leaves for Shanghai tomorrow morning. （表“已确定的行程”更常用进行时）",
    "tip": "行程/车次/会议类，优先用 <b>am/is/are + leaving/coming</b> 表将来。"
  },
  {
    "topic": "非限定性定语从句用 which（不用 that）",
    "cat": "clause",
    "rule": "逗号隔开的非限定性从句修饰物用 which，且关系代词不能省略；that 不能用于非限定性从句。",
    "right": "The new elevator, which was installed last month, works well.",
    "wrong": "The new elevator, that was installed last month, works well. （非限定性从句不能用 that）",
    "tip": "看见逗号 + 修饰物 → 用 <b>which</b>，不可省。"
  },
  {
    "topic": "介词 + which / whom 引导定语从句",
    "cat": "clause",
    "rule": "当定语从句的介词提前时，指物用 which、指人用 whom，不能用 that。",
    "right": "This is the file in which we store the data.",
    "wrong": "This is the file in that we store the data. （介词后不能用 that，须用 which）",
    "tip": "<b>in/on/for + which/whom</b> 是固定搭配。"
  },
  {
    "topic": "虚拟语气 if 省略倒装",
    "cat": "clause",
    "rule": "虚拟条件句省略 if 时，were / had / should 提到主语前构成倒装。",
    "right": "Were I you, I would accept the offer. / Had we left earlier, we wouldn't be late.",
    "wrong": "If were I you, I would accept the offer. （省略 if 必须倒装 Were I）",
    "tip": "<b>Were/Had/Should + 主语</b> = if 从句。"
  },
  {
    "topic": "建议/要求类动词后 that 从句用原形",
    "cat": "mood",
    "rule": "insist / demand / require / suggest / order 等表示“建议、要求、命令”的动词，其宾语从句用 (should) + 动词原形。",
    "right": "The manager demanded that he (should) leave at once.",
    "wrong": "The manager demanded that he leaves at once. （此类动词后从句须用原形动词）",
    "tip": "记口诀：<b>I DeReSire</b>（Insist, Demand, Require, Suggest, order...）+ (should) do。"
  },
  {
    "topic": "wish 后的虚拟语气",
    "cat": "mood",
    "rule": "wish 后接与现在相反用过去时，与过去相反用过去完成时，与将来相反用 would/could。",
    "right": "I wish I knew the answer. / I wish I had studied harder.",
    "wrong": "I wish I know the answer. （wish 表“遗憾”，现在相反须用过去时 knew）",
    "tip": "<b>wish + 过去时</b> 表现在遗憾；<b>wish + had done</b> 表过去遗憾。"
  },
  {
    "topic": "冠词 the 表特指 vs 零冠词表泛指",
    "cat": "prep",
    "rule": "第二次提到或双方已知的事物用 the 表特指；泛指一类用 a/an 或不加冠词。",
    "right": "I bought a book. The book is interesting.",
    "wrong": "I bought a book. Book is interesting. （再次提到须用 the book）",
    "tip": "<b>前文提过</b> 或 <b>独一无二</b> 用 the。"
  },
  {
    "topic": "by / until / till 时间介词",
    "cat": "prep",
    "rule": "by 表示“到…为止（不晚于）”；until/till 表示“直到…才”，与延续性动词或否定句搭配更常见。",
    "right": "Please finish it by Friday. / He didn't leave until midnight.",
    "wrong": "Please finish it until Friday. （“截止到周五”用 by，不用 until）",
    "tip": "<b>by</b> = 截止点；<b>until</b> = 持续到。"
  },
  {
    "topic": "since 与 for 在现在完成时",
    "cat": "prep",
    "rule": "现在完成时中 for + 时间段，since + 时间点/从句（since 后接过去时）。",
    "right": "She has lived here for 10 years. / She has lived here since 2015.",
    "wrong": "She has lived here since 10 years. （since 后接时间点，时间段用 for）",
    "tip": "<b>for</b> 多久；<b>since</b> 从何时（点）。"
  },
  {
    "topic": "使役动词 make/let/have + 宾补",
    "cat": "voice",
    "rule": "make / let / have 后的宾语补足语用动词原形（不带 to）。",
    "right": "The noise made me wake up. / Let him go.",
    "wrong": "The noise made me to wake up. （使役动词后宾补用原形，无 to）",
    "tip": "<b>一感二听三让四看</b> 后宾补用原形（被动时恢复 to）。"
  },
  {
    "topic": "感官动词 see/hear + 宾补 do/doing",
    "cat": "voice",
    "rule": "see/hear/watch + 宾语 + do 表动作全程/已发生；+ doing 表动作正在进行。",
    "right": "I saw him cross the street. / I saw him crossing the street.",
    "wrong": "I saw him to cross the street. （感官动词后不用 to do）",
    "tip": "<b>do</b> 看完整；<b>doing</b> 看进行。"
  },
  {
    "topic": "非谓语动词 to do vs doing 作主语",
    "cat": "word",
    "rule": "不定式 to do 表具体、将来、特定的动作；动名词 doing 表抽象、习惯、泛指的概念。",
    "right": "To finish this today is impossible. / Reading is my hobby.",
    "wrong": "Read is my hobby. （作主语表习惯概念须用动名词 Reading）",
    "tip": "<b>一次性的</b> 用 to do；<b>习惯性的</b> 用 doing。"
  },
  {
    "topic": "分词作状语的逻辑主语",
    "cat": "word",
    "rule": "现在分词/过去分词作状语时，其逻辑主语必须与主句主语一致。",
    "right": "Walking in the park, I saw a rare bird.",
    "wrong": "Walking in the park, a rare bird was seen by me. （分词逻辑主语应是 I，不是 bird）",
    "tip": "<b>分词开头</b> → 主句主语就是分词主语。"
  },
  {
    "topic": "情态动词表推测 must/can't/may",
    "cat": "word",
    "rule": "肯定推测用 must（一定），否定推测用 can't（不可能），不确定用 may/might（可能）。",
    "right": "He must be tired. / He can't be in the office now.",
    "wrong": "He mustn't be tired. （mustn't 表“禁止”不表推测；推测否定用 can't）",
    "tip": "<b>must</b> 肯定推测；<b>can't</b> 否定推测；<b>may</b> 不确定。"
  },
  {
    "topic": "the more..., the more... 比较结构",
    "cat": "word",
    "rule": "“越…越…”用 the + 比较级…, the + 比较级…，前后都用陈述语序。",
    "right": "The more you practice, the better you become.",
    "wrong": "More you practice, better you become. （须加 the，且比较级紧接 the 后）",
    "tip": "<b>The + 比较级</b>, <b>the + 比较级</b>，不可省 the。"
  },
  {
    "topic": "倒装：否定词开头",
    "cat": "word",
    "rule": "never / hardly / seldom / not only 等否定词置于句首时，主句须部分倒装（助动词提前）。",
    "right": "Never have I seen such a thing. / Not only did he come, but he helped.",
    "wrong": "Never I have seen such a thing. （否定词开头须倒装 have I）",
    "tip": "<b>否定词居首</b> → 助动词/be/情态动词提前。"
  }
];

var GRAMMAR_CAT = {
  "tense": "时态",
  "clause": "从句",
  "mood": "语气",
  "prep": "介词冠词",
  "voice": "语态",
  "word": "词法"
};

var GRAM_BATCH = 10;

