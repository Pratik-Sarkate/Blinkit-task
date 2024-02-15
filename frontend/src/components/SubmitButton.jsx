export function SubmitButton({label, onClick}){

    return (
        <div className="flex justify-center bg-green-300 w-full rounded-md cursor-pointer hover:shadow-xl hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium" onClick={onClick}>
            <div className="text-md p-2">{label}</div>
        </div>
    )
}