# ChatGPT Global Price Comparison

一個即時比較全球不同地區 ChatGPT 訂閱價格的工具。

## 功能特點

- 🌍 顯示全球各地區的 ChatGPT 訂閱價格
- 💱 即時貨幣轉換功能
- 🔄 支持升序/降序排序價格
- 💰 支持多種貨幣顯示
- 📊 清晰的價格比較界面
- ⚡ 實時匯率更新

## 技術棧

- **前端框架**: Next.js 13
- **UI 組件**: Radix UI
- **樣式**: Tailwind CSS
- **圖標**: Lucide Icons
- **數據源**: 
  - ChatGPT 價格 API
  - Exchange Rate API

## 本地開發

1. 克隆項目:
```bash
git clone https://github.com/6Kmfi6HP/ChatGPT-Global-Price-Comparison.git
cd ChatGPT-Global-Price-Comparison
```

2. 安裝依賴:
```bash
npm install
```

3. 運行開發服務器:
```bash
npm run dev
```

4. 打開瀏覽器訪問 [http://localhost:3000](http://localhost:3000)

## 構建部署

構建生產版本:
```bash
npm run build
```

運行生產版本:
```bash
npm run start
```

## 主要功能說明

- **價格顯示**: 顯示 ChatGPT 各個訂閱計劃（如 Plus、Mini）在不同地區的價格
- **貨幣轉換**: 自動將各地區價格轉換為用戶選擇的貨幣
- **排序功能**: 可以按價格高低對國家/地區進行排序
- **實時匯率**: 使用最新的匯率數據進行貨幣轉換

## 數據來源

- ChatGPT 價格數據: `familypro.io/api/triple/price-list/ChatGPT`
- 匯率數據: `api.exchangerate-api.com`

## 貢獻

歡迎提交 Pull Requests 來改進這個項目。對於重大更改，請先開 issue 討論您想要改變的內容。

## 許可證

MIT License