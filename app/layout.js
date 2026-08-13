export const metadata = {
  title: "莱恩的云上国度 | Ryan's Cloud Realm",
  description: '美卡资讯与数据库展示',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body style={{ backgroundColor: '#f8fafc', margin: 0 }}>{children}</body>
    </html>
  )
}
