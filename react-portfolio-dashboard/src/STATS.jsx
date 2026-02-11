function Stats (props){
    return (
        <div className="flex justify-between p-2 g-slate-100 rounded-lg mb-4">
            <p className="text-sm font-bold"> Total tasks: {props.total}</p>
        </div>
    );
}

export default Stats;