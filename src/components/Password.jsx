export function Password({label, placeholder, onChange}) {
    return <div>
        <div className="text-sm font-medium text-left py-2">{label}</div>
        <input type="password" onChange={onChange} placeholder={placeholder} className=" placeholder:italic w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}