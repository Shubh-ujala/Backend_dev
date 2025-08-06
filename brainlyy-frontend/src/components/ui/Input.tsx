export function Input({placeholder,ref}:{placeholder:string,ref?:any}){
    return <div>
        <input placeholder={placeholder} ref={ref} type="text" className="px-4 py-2 border border-slate-400 rounded-md m-2" />
    </div>
}