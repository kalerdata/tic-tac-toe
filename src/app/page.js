"use client"
import TicTacToe from "@/components/Pattern";
export default function Home() {
  return (
    <div className=" justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl capitalize">Tic tac toe</h1>
      <hr className="w-full h-3 mt-3  text-black" />

      <TicTacToe />
    </div>
  );
}
