type ButtonProps = {
    text: string;
    onClick?: () => void;
};

export default function Button({ text, onClick }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                px-5 py-2 
                bg-blue-600 text-white rounded-lg
                cursor-pointer
                transition-all duration-200
                hover:bg-blue-800 hover:scale-105
                active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-400
            "
        >
            {text}
        </button>
    );
}