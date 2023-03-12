const Button = ({onClick, text}) => {
  return (
    <button
    className="ml-2 bg-gradient-to-r from-[#C572E2] to-[#6AC3D7] p-2 rounded-[16px] text-white w-[151px] h-[calc(100%-4px)] text-[16px] font-semibold"
    onClick={() => {onClick()}}
  >
    {text}
  </button>
  )
}

export default Button