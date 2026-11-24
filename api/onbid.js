export default async function handler(req, res) {
  const serviceKey = process.env.DATA_GO_KR_KEY;
  if (!serviceKey) {
    return res.status(500).json({ error: "Vercel 환경변수에 DATA_GO_KR_KEY가 없습니다." });
  }

  const { pageNo = 1, numOfRows = 100 } = req.query;
  // 차세대 온비드 부동산 물건목록 조회서비스 End Point[span_1](start_span)[span_1](end_span)
  const baseUrl = "https://apis.data.go.kr/B010003/OnbidRlstListSrvc2/getOnbidRlstList";
  const url = `${baseUrl}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.status(200).send(text);
  } catch (err) {
    return res.status(500).json({ error: "온비드 서버 호출 실패", detail: err.message });
  }
}
