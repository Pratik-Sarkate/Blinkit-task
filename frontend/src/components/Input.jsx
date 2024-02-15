export function Input({label, placeholder, onChange}){

    return (
        <div className="py-2 ">
            <div className="text-sm text-slate-500 ">{label}</div>
            <input className="border rounded-md bg-[#fdfcff] p-1 w-full" type="text" placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}