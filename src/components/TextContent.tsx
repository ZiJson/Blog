import parse from "html-react-parser"
export const textTranslate = (text: string) => {
    const splitStrong = (piece: string): string => {
        if (piece.includes("**")) {
            const pieces = piece.split("**")
            return pieces.map((item, index) => {
                return index % 2 === 0 ? item : `<strong>${item}</strong>`
            }).join("")
        }
        return piece
    }
    const splitLink = (piece: string): string => {
        if (piece.includes(")[")) {
            const pieces = piece.split(/\(|\]/);
            return pieces.map((item, index) => {
                if (index % 2 === 0) return item;
                const [link, url] = item.split(")[", 2);
                return `<a href="${url}">${link}</a>`
            }).join("")
        }
        return piece
    }
    return splitLink(splitStrong(text))
}
const TextContent = ({ text }: {
    text: string
}) => {
    const translated = textTranslate(text);

    return (
        <div className="text-content w-full text-slate-500 leading-relaxed text-base tracking-wide">
            {parse(translated)}
        </div>
    )
}

export default TextContent