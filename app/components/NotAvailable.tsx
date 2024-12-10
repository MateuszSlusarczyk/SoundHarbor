
interface ErrorProps {
    setShowError: (value: boolean) => void;
}

export default function NotAvailable({ setShowError }: ErrorProps) {
    return (
        <div className="flex items-center justify-center w-screen h-screen fixed top-0 left-0 z-50">
            <div className="w-1/2 h-1/2 md:w-1/3 bg-primary rounded-md relative flex flex-col items-center justify-center shadow-lg p-2 border-secondary border-2">
                <button
                    onClick={() => setShowError(false)}
                    className="absolute top-2 right-2  p-2 rounded-full hover:bg-secondary transition"
                >
                    <p>X</p>
                </button>
                <p className="text-center">Ze względu na zmiany w API Spotify, ta funkcjonalność nie jest już dostępna. <br/>Przepraszamy za niedogodności.</p>
            </div>
        </div>
    );
}
