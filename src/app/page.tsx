import Calculator from "@/components/calculator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F0F0F3]">
      <div className="relative w-full max-w-md">
        {/* Decorative elements */}
        <div className="absolute box -left-36 -top-16 w-32 h-32 bg-white rounded-xl shadow-lg hidden md:block"></div>
        <div className="absolute box -right-36 -top-16 w-40 h-40 bg-white rounded-xl shadow-lg hidden md:block"></div>
        <div className="absolute box -left-44 bottom-0 w-[194px] h-[194px] bg-white rounded-full shadow-lg hidden md:block"></div>
        <div className="absolute box -right-36 bottom-0 w-36 h-36 bg-white rounded-full shadow-lg hidden md:block"></div>

        {/* Background pattern */}
        <div className="absolute right-0 top-1/4 grid grid-cols-5 gap-2 opacity-20 hidden md:grid">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-gray-400 rounded-full"></div>
          ))}
        </div>

        {/* Calculator component */}
        <Calculator />
      </div>
    </main>
  )
}

