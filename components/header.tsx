import Link from "next/link"

export default function Header() {
  return (
    <header className='bg-white flex justify-between sticky top-0'>
      <Link href="/search">
        検索
      </Link>
      <a href="/">Hoge</a>
      <button>サイドバー</button>
    </header>
  )
}