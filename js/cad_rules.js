// AUTO-GENERATED from cad_rules.py —— 单一事实来源，勿手改
// 重新生成：python assets/scripts/gen_cad_rules_js.py
var CAD_RULES = [
[
"基本信息",
"设计者",
{
"type": "ignore",
"note": "报告全文未出现设计者；无 CAD 字段对应，由 CRM/项目台账取"
}
],
[
"基本信息",
"项目名称",
{
"type": "user_fill",
"note": "报告为『玉岱美庐』，CAD 为『玉岱美庐5』，楼栋号/分期由用户确认填写"
}
],
[
"基本信息",
"工地地址",
{
"type": "ignore",
"note": "报告未出现工地地址；由 CRM/项目台账取，工具不填"
}
],
[
"基本信息",
"项目号",
{
"type": "derive",
"prefix": "WH",
"note": "文件名 CSC 后数字代码前加 WH → 项目号"
}
],
[
"基本信息",
"CSC号",
{
"type": "derive",
"prefix": "CSC",
"note": "文件名 CSC 后数字代码前加 CSC → CSC号"
}
],
[
"基本信息",
"所在区域",
{
"type": "fixed_default",
"value": "CHN",
"note": "默认 CHN"
}
],
[
"基本信息",
"图纸语言",
{
"type": "fixed_default",
"value": "Chinese",
"note": "默认 Chinese"
}
],
[
"基本信息",
"分公司",
{
"type": "fixed_default",
"value": "WH",
"note": "默认 WH（武汉）"
}
],
[
"基本信息",
"本地客户类型",
{
"type": "user_fill",
"note": "一般客户取 CAD 默认；特殊客户由用户手动处理，工具不自动填"
}
],
[
"基本信息",
"电梯数量",
{
"type": "user_fill",
"note": "报告台数=2 指整组，单台数量由用户填"
}
],
[
"基本信息",
"图纸类型",
{
"type": "user_fill",
"note": "测试/投标/正式订单图纸，由用户勾选"
}
],
[
"基本信息",
"设备号",
{
"type": "report_value",
"lookup": "梯号",
"transform": [
{
"kind": "none"
}
],
"note": "直接对应设备号"
}
],
[
"轿厢",
"电梯类型",
{
"type": "report_value",
"lookup": "技术规格",
"transform": [
{
"kind": "map",
"map": {
"Nmono": "NMonoSpace"
}
}
],
"note": "Nmono → NMonoSpace"
}
],
[
"轿厢",
"安全标准",
{
"type": "report_value",
"lookup": "电梯制造规范",
"transform": [
{
"kind": "map",
"map": {
"000326": "KOS000326"
}
}
],
"note": "取标准编码"
}
],
[
"轿厢",
"补充标准",
{
"type": "fixed_default",
"value": "None",
"note": "报告未提及默认 None"
}
],
[
"轿厢",
"业务类型",
{
"type": "user_fill",
"note": "住宅项目业务类型由用户填"
}
],
[
"轿厢",
"电梯平台",
{
"type": "report_value",
"lookup": "技术规格",
"transform": [
{
"kind": "map",
"map": {
"Nmono": "NMonoSpace"
}
}
],
"note": "Nmono → NMonoSpace"
}
],
[
"轿厢",
"轿厢尺寸类型",
{
"type": "report_value",
"lookup": "轿厢尺寸类型",
"transform": [
{
"kind": "map",
"map": {
"可变轿厢": "Flexible"
}
}
],
"note": "可变轿厢 → Flexible"
}
],
[
"轿厢",
"人数",
{
"type": "cad_auto",
"note": "CAD 根据载重自动生成人数"
}
],
[
"轿厢",
"载重",
{
"type": "report_value",
"lookup": "载重",
"transform": [
{
"kind": "digits"
}
],
"note": "1050KG → 1050"
}
],
[
"轿厢",
"速度(m/s)",
{
"type": "report_value",
"lookup": "速度",
"transform": [
{
"kind": "first_token"
}
],
"note": "1.75 m/s → 1.75"
}
],
[
"轿厢",
"轿厢类型",
{
"type": "cad_auto",
"note": "轿厢类型 CAD 自动生成（报告 SEC 仅供参考）"
}
],
[
"轿厢",
"轿厢入口",
{
"type": "user_fill",
"note": "轿厢入口由用户填"
}
],
[
"轿厢",
"BB",
{
"type": "report_value",
"lookup": "轿厢净宽(BB)(以FLCAD和DL为准)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"轿厢",
"DD",
{
"type": "report_value",
"lookup": "轿厢净深(DD)(以FLCAD和DL为准)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"轿厢",
"LL",
{
"type": "report_value",
"lookup": "开门方式和开门宽度",
"transform": [
{
"kind": "digits"
}
],
"note": "开门宽度=LL"
}
],
[
"轿厢",
"LP",
{
"type": "cad_auto",
"note": "LP 默认不填（CAD 自动）"
}
],
[
"轿厢",
"轿厢高度",
{
"type": "report_value",
"lookup": "轿高",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"轿厢",
"开门类型",
{
"type": "report_value",
"lookup": "开门方式和开门宽度",
"transform": [
{
"kind": "map",
"map": {
"CO": "CENTER"
}
}
],
"note": "CO = Center Opening"
}
],
[
"轿厢",
"门高",
{
"type": "report_value",
"lookup": "开门高度",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"轿厢",
"轿厢门",
{
"type": "fixed_default",
"value": "AMD",
"note": "CAD 默认 AMD"
}
],
[
"轿厢",
"行程(mm)",
{
"type": "report_value",
"lookup": "行程(m)",
"transform": [
{
"kind": "mul1000"
}
],
"note": "79.95m × 1000"
}
],
[
"轿厢",
"额外装潢(kg)",
{
"type": "report_value",
"lookup": "额外装潢重量(具体请参考DL规则)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"轿厢",
"进口马达",
{
"type": "report_value",
"lookup": "马达",
"transform": [
{
"kind": "map",
"map": {
"NMX11": "NO"
}
}
],
"note": "NMX11 非进口 → NO"
}
],
[
"轿厢",
"马达类型",
{
"type": "report_value",
"lookup": "马达",
"transform": [
{
"kind": "code"
}
],
"note": "直接提取 NMX11"
}
],
[
"轿厢",
"轿底类型",
{
"type": "conditional",
"lookup": "地板类型",
"conditions": [
{
"if_contains": [
"单色",
"拼花地板",
"未订购"
],
"value": "PVC"
}
],
"else_status": "需澄清",
"else_note": "报告地板类型为其它具体材料，列出原文交用户判断",
"note": ""
}
],
[
"轿厢",
"轿底厚度",
{
"type": "cad_auto",
"note": "轿底厚度 CAD 自动生成"
}
],
[
"轿厢",
"轿壁厚度",
{
"type": "conditional",
"lookup": "轿壁厚度",
"conditions": [
{
"if_equals": "1.0mm",
"value": "None"
}
],
"else_status": "需澄清",
"else_note": "轿壁厚度非 1.0mm，列出原文交用户判断",
"note": ""
}
],
[
"轿厢",
"隔音装置",
{
"type": "fixed_default",
"value": "No",
"note": "未提及默认 No（先查报告其他选项/数字化产品/电气功能章节）"
}
],
[
"轿厢",
"后壁装潢",
{
"type": "fixed_default",
"value": "0",
"note": "未提及默认 0"
}
],
[
"轿厢",
"玻璃轿壁",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"轿厢",
"轿壁材料(B侧)",
{
"type": "report_value",
"lookup": "B侧轿壁材质",
"transform": [
{
"kind": "first_token"
}
],
"note": "直接对应 ST43"
}
],
[
"轿厢",
"轿壁材料(D侧)",
{
"type": "report_value",
"lookup": "D侧轿壁材质",
"transform": [
{
"kind": "first_token"
}
],
"note": "直接对应 ST43"
}
],
[
"轿厢",
"轿壁材料(C侧)",
{
"type": "fixed_default",
"value": "ST43",
"note": "C 侧默认同 B/D 侧"
}
],
[
"轿厢",
"轿顶类型",
{
"type": "report_value",
"lookup": "吊顶类型和材质",
"transform": [
{
"kind": "code"
}
],
"note": "取 LF18"
}
],
[
"轿厢",
"镜子",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"轿厢",
"扶手类型",
{
"type": "report_value",
"lookup": "后壁扶手",
"transform": [
{
"kind": "map",
"map": {
"无扶手": ""
}
}
],
"note": "无扶手 → 空"
}
],
[
"轿厢",
"轿厢裙板",
{
"type": "report_value",
"lookup": "裙板材质",
"transform": [
{
"kind": "first_token"
}
],
"note": "直接对应 ST43"
}
],
[
"轿厢",
"缓冲栏杆类型",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"轿厢",
"旋转COP",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"轿厢",
"缓冲栏杆材料",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"轿厢",
"轿厢多媒体屏",
{
"type": "fixed_default",
"value": "No",
"note": "未提及默认 No"
}
],
[
"厅门",
"HH",
{
"type": "report_value",
"lookup": "开门高度",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"厅门",
"LL",
{
"type": "report_value",
"lookup": "开门方式和开门宽度",
"transform": [
{
"kind": "digits"
}
],
"note": "开门宽度"
}
],
[
"厅门",
"厅门类型",
{
"type": "report_value",
"lookup": "厅门类型及材质-1",
"transform": [
{
"kind": "map",
"map": {
"Base Duty": "Normal door package"
}
}
],
"note": "轻型门/Base Duty → Normal door package"
}
],
[
"厅门",
"门框类型",
{
"type": "cad_auto",
"note": "门框类型 CAD 自动生成"
}
],
[
"厅门",
"地坎类型",
{
"type": "fixed_default",
"value": "N2",
"note": "报告未提及默认 N2（样例 N1 为误填）"
}
],
[
"厅门",
"层门地坎材料",
{
"type": "report_value",
"lookup": "层门地坎材料",
"transform": [
{
"kind": "first_token"
}
],
"note": "A = 铝型材 → A"
}
],
[
"厅门",
"门板",
{
"type": "conditional",
"lookup": "厅门门板类型",
"conditions": [
{
"if_contains": [
"贴皮或玻璃"
],
"value": "None"
}
],
"else_status": "需澄清",
"else_note": "门板类型为其它具体材料，列出原文交用户判断",
"note": ""
}
],
[
"厅门",
"门板加厚装璜",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"厅门",
"安装方式",
{
"type": "cad_auto",
"note": "安装方式 CAD 自动生成（报告嵌入式→Expander bolts）"
}
],
[
"厅门",
"重型门机(增值包)",
{
"type": "report_value",
"lookup": "更高层门类型",
"transform": [
{
"kind": "map",
"map": {
"不需要": "NO"
}
}
],
"note": "不需要 → NO"
}
],
[
"厅门",
"厅门增值包",
{
"type": "report_value",
"lookup": "更高层门类型",
"transform": [
{
"kind": "map",
"map": {
"不需要": ""
}
}
],
"note": "无增值包 → 空"
}
],
[
"厅门",
"厅门类型(第二处)",
{
"type": "report_value",
"lookup": "厅门类型及材质-1",
"transform": [
{
"kind": "before_sep"
},
{
"kind": "map",
"map": {
"Base Duty": "Base duty"
}
}
],
"note": "Base Duty / ST43 → Base duty"
}
],
[
"厅门",
"防火代码",
{
"type": "report_value",
"lookup": "防火类别",
"transform": [
{
"kind": "map",
"map": {
"非防火": "N"
}
}
],
"note": "非防火_N → N"
}
],
[
"井道布局",
"曳引机位置",
{
"type": "fixed_default",
"value": "Right",
"note": "无机房（MonoSpace）默认 right"
}
],
[
"井道布局",
"WW",
{
"type": "report_value",
"lookup": "井道净宽(WW)(以FLCAD和DL为准)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"井道布局",
"WD",
{
"type": "report_value",
"lookup": "井道净深(WD)(以FLCAD和DL为准)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"井道布局",
"FL",
{
"type": "user_fill",
"note": "FL 由用户填（来源井道布置图）"
}
],
[
"井道布局",
"FR",
{
"type": "user_fill",
"note": "FR 由用户填"
}
],
[
"井道布局",
"Door offset",
{
"type": "user_fill",
"note": "Door offset 由用户填"
}
],
[
"井道布局",
"FWL",
{
"type": "user_fill",
"note": "FWL 由用户填"
}
],
[
"井道布局",
"FWR",
{
"type": "user_fill",
"note": "FWR 由用户填"
}
],
[
"井道布局",
"电压(V)",
{
"type": "fixed_default",
"value": "3x380",
"note": "默认 3x380"
}
],
[
"井道布局",
"电压频率(Hz)",
{
"type": "fixed_default",
"value": "50",
"note": "默认 50"
}
],
[
"井道布局",
"MAP",
{
"type": "report_value",
"lookup": "WMAP(墙壁安装MAP)安装方式",
"transform": [
{
"kind": "map",
"map": {
"嵌入式": "Wall MAP"
}
}
],
"note": "WMAP 有 → Wall MAP"
}
],
[
"井道布局",
"MAP所在楼层",
{
"type": "fixed_default",
"value": "Topmost Floor",
"note": "默认 Topmost Floor"
}
],
[
"井道布局",
"MAP Mounting",
{
"type": "report_value",
"lookup": "WMAP(墙壁安装MAP)安装方式",
"transform": [
{
"kind": "map",
"map": {
"嵌入式": "Semi flush"
}
}
],
"note": "嵌入式 → Semi flush"
}
],
[
"井道布局",
"控制柜和驱动支架",
{
"type": "fixed_default",
"value": "YES",
"note": "默认 YES"
}
],
[
"井道布局",
"井道照明",
{
"type": "fixed_default",
"value": "KONE",
"note": "默认 KONE"
}
],
[
"井道布局",
"轿厢缓冲器底座提供者",
{
"type": "fixed_default",
"value": "KONE",
"note": "默认 KONE"
}
],
[
"井道布局",
"进口曳引绳",
{
"type": "fixed_default",
"value": "NO",
"note": "进口件未提及默认 NO"
}
],
[
"井道布局",
"底坑爬梯",
{
"type": "report_value",
"lookup": "底坑爬梯",
"transform": [
{
"kind": "map",
"map": {
"有": "KONE"
}
}
],
"note": "有 → KONE"
}
],
[
"井道布局",
"标准段导轨长度(mm)",
{
"type": "fixed_default",
"value": "5000",
"note": "一般默认 5000（2500 成本提高）"
}
],
[
"井道布局",
"逃生窗",
{
"type": "fixed_default",
"value": "NO",
"note": "未提及默认 No（先查报告章节）"
}
],
[
"井道布局",
"安装方式",
{
"type": "conditional",
"lookup": "无脚手架安装",
"conditions": [
{
"if_contains": [
"有",
"无脚手架"
],
"value": "Scaffold free"
}
],
"else_status": "需澄清",
"else_note": "报告未提及无脚手架安装，请确认",
"note": "无脚手架安装 → Scaffold free"
}
],
[
"井道布局",
"缓冲器类型",
{
"type": "fixed_default",
"value": "Local",
"note": "进口件未提及默认 Local"
}
],
[
"井道布局",
"进口驱动系统",
{
"type": "fixed_default",
"value": "NO",
"note": "进口件未提及默认 NO"
}
],
[
"井道布局",
"BMV驱动的制动方式",
{
"type": "fixed_default",
"value": "NO",
"note": "默认 NO"
}
],
[
"井道布局",
"EBD A,紧急电池驱动",
{
"type": "fixed_default",
"value": "NO",
"note": "未提及默认 No"
}
],
[
"井道布局",
"马达急停开关",
{
"type": "report_value",
"lookup": "马达急停开关",
"transform": [
{
"kind": "map",
"map": {
"有": "YES"
}
}
],
"note": "有 → YES"
}
],
[
"井道布局",
"安全部件自制",
{
"type": "fixed_default",
"value": "Supplier",
"note": "未提及默认 Supplier（先查报告章节）"
}
],
[
"井道布局",
"噪音减少装置",
{
"type": "fixed_default",
"value": "NO",
"note": "未提及默认 No"
}
],
[
"井道布局",
"地坑进水探测",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"井道布局",
"轿厢导轨选项",
{
"type": "fixed_default",
"value": "None",
"note": "未提及默认 None"
}
],
[
"井道布局",
"对重块材质",
{
"type": "report_value",
"lookup": "对重填充材料要求",
"transform": [
{
"kind": "map",
"map": {
"无特殊需求": "No require"
}
}
],
"note": "无特殊需求 → No require"
}
],
[
"井道行层",
"楼层数量",
{
"type": "report_value",
"lookup": "建筑楼层",
"transform": [
{
"kind": "first_token"
}
],
"note": "27 / 27 → 27"
}
],
[
"井道行层",
"行程(mm)",
{
"type": "report_value",
"lookup": "行程(m)",
"transform": [
{
"kind": "mul1000"
}
],
"note": "× 1000"
}
],
[
"井道行层",
"厅站数量",
{
"type": "report_value",
"lookup": "停站/厅门数",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"井道行层",
"SH",
{
"type": "report_value",
"lookup": "顶层高度(mm)",
"transform": [
{
"kind": "digits"
}
],
"note": "以报告 5800 为准（CAD 显示 5500 为误）"
}
],
[
"井道行层",
"顶层高度",
{
"type": "user_fill",
"note": "顶层高度字段由用户填（报告值 5800）"
}
],
[
"井道行层",
"护栏",
{
"type": "ignore",
"note": "经核对 6 张 CAD 截图，井道行层页无『护栏』填写框，直接忽略"
}
],
[
"井道行层",
"H(行程)",
{
"type": "report_value",
"lookup": "行程(m)",
"transform": [
{
"kind": "mul1000"
}
],
"note": "× 1000"
}
],
[
"井道行层",
"PH(底坑深度)",
{
"type": "report_value",
"lookup": "底坑深度(mm)(当深度>=3600时，请预留底坑平台)(PH影响价格)",
"transform": [
{
"kind": "digits"
}
],
"note": "直接对应"
}
],
[
"井道行层",
"主楼层侧选择",
{
"type": "user_fill",
"note": "主楼层侧选择由用户填"
}
],
[
"井道行层",
"楼层间距HF(各层)",
{
"type": "user_fill",
"note": "楼层间距 HF 各层由建筑图/井道图提供"
}
],
[
"井道行层",
"楼层类型(各层)",
{
"type": "user_fill",
"note": "楼层类型各层由用户填"
}
],
[
"井道行层",
"楼层层数(各层)",
{
"type": "user_fill",
"note": "楼层层数各层由用户填"
}
],
[
"井道行层",
"楼层标记(各层)",
{
"type": "user_fill",
"note": "楼层标记各层由用户填"
}
],
[
"井道行层",
"开门侧(各层)",
{
"type": "user_fill",
"note": "开门侧各层由用户填"
}
],
[
"井道行层",
"A侧服务楼层(各层)",
{
"type": "report_value",
"lookup": "服务楼层(电梯停靠的层数)",
"transform": [
{
"kind": "const",
"value": "全部 A 侧服务（共 27 层，请逐层勾选）"
}
],
"note": "报告全部楼层 A 侧服务"
}
],
[
"井道行层",
"C侧服务楼层(各层)",
{
"type": "report_value",
"lookup": "服务楼层(电梯停靠的层数)",
"transform": [
{
"kind": "const",
"value": "无 C 侧服务（均不勾选）"
}
],
"note": "无 C 侧服务"
}
],
[
"井道行层",
"A侧门洞高HR(各层)",
{
"type": "cad_auto",
"note": "A 侧门洞高 HR CAD 自动生成"
}
],
[
"井道行层",
"C侧门洞高HR(各层)",
{
"type": "report_value",
"lookup": "服务楼层(电梯停靠的层数)",
"transform": [
{
"kind": "const",
"value": "无 C 侧门洞（均填 0）"
}
],
"note": "无 C 侧门洞"
}
],
[
"召唤及显示",
"控制方式",
{
"type": "fixed_default",
"value": "FC FullCollective",
"note": "固定默认 FC FullCollective"
}
],
[
"召唤及显示",
"信号系统",
{
"type": "report_value",
"lookup": "信号系统类型",
"transform": [
{
"kind": "map",
"map": {
"KDS 360": "KDS360"
}
}
],
"note": "直接对应"
}
],
[
"召唤及显示",
"Signalization Series",
{
"type": "report_value",
"lookup": "厅站信号系统类型",
"transform": [
{
"kind": "map",
"map": {
"KDS360": "KDS360"
}
}
],
"note": "直接对应"
}
],
[
"召唤及显示",
"按钮形状",
{
"type": "cad_auto",
"note": "按钮形状 CAD 自动生成（默认 Default）"
}
],
[
"召唤及显示",
"外呼安装方式",
{
"type": "report_value",
"lookup": "KDS360 层站召唤显示类型",
"transform": [
{
"kind": "map",
"map": {
"表贴式": "Surface Mounted"
}
}
],
"note": "表贴式安装 → Surface Mounted"
}
],
[
"召唤及显示",
"层站召唤位置(从A侧看)",
{
"type": "user_fill",
"note": "层站召唤位置由用户填"
}
],
[
"召唤及显示",
"消防开关类型",
{
"type": "report_value",
"lookup": "FRD - 消防运行",
"transform": [
{
"kind": "map",
"map": {
"有": "FRD"
}
}
],
"note": "有 → FRD"
}
],
[
"召唤及显示",
"消防开关选项",
{
"type": "frd_conditional",
"depends_on": [
"召唤及显示",
"消防开关类型"
],
"value_when": "2-surface-slideswitch",
"else_value": "",
"note": "消防开关类型=FRD 则填 2-surface-slideswitch"
}
],
[
"召唤及显示",
"FRD A侧",
{
"type": "fixed_default",
"value": "1",
"note": "FRD A 侧默认 1"
}
],
[
"召唤及显示",
"FRD C侧",
{
"type": "fixed_default",
"value": "",
"note": "FRD A 侧已填，故 C 侧不填"
}
],
[
"召唤及显示",
"FRD位置",
{
"type": "fixed_default",
"value": "A1",
"note": "FRD 位置默认 A1"
}
],
[
"召唤及显示",
"外呼显示位置",
{
"type": "user_fill",
"note": "外呼显示位置由用户填"
}
],
[
"召唤及显示",
"COP series",
{
"type": "report_value",
"lookup": "KDS360 轿内操纵面板类型",
"transform": [
{
"kind": "map",
"map": {
"全高COP": "KDS360"
}
}
],
"note": "全高COP → KDS360"
}
],
[
"召唤及显示",
"COP数量",
{
"type": "report_value",
"lookup": "COP数量",
"transform": [
{
"kind": "map",
"map": {
"一块": "1"
}
}
],
"note": "一块 → 1"
}
],
[
"召唤及显示",
"COP类型",
{
"type": "report_value",
"lookup": "KDS360 轿内操纵面板类型",
"transform": [
{
"kind": "map",
"map": {
"全高COP": "FullHeight"
}
}
],
"note": "全高COP → FullHeight"
}
],
[
"召唤及显示",
"COP位置",
{
"type": "user_fill",
"note": "COP 位置由用户填（须参照 DL）"
}
],
[
"召唤及显示",
"召唤类型(各层)",
{
"type": "report_value",
"lookup": "LCI 一体式层站召唤",
"transform": [
{
"kind": "map",
"map": {
"一体式": "LCI"
}
}
],
"note": "一体式层站召唤 → LCI"
}
],
[
"召唤及显示",
"到站灯显(各层)",
{
"type": "ignore",
"note": "到站灯显各层不用管"
}
],
[
"召唤及显示",
"锁(各层)",
{
"type": "fixed_default",
"value": "主楼层=1，其余楼层=0",
"note": "主楼层为 1"
}
],
[
"召唤及显示",
"召唤共享(各层)",
{
"type": "ignore",
"note": "召唤共享各层不用管"
}
],
[
"召唤及显示",
"多媒体(各层)",
{
"type": "ignore",
"note": "多媒体各层不用管"
}
],
[
"召唤及显示",
"DIN Type(各层)",
{
"type": "ignore",
"note": "DIN Type 各层不用管"
}
]
];
