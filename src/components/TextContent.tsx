
const TextContent = ({ text }: {
    text: string
}) => {
    return (
        <div className="w-full text-slate-500 leading-relaxed text-base tracking-wide">{text}</div>
    )
}

export default TextContent