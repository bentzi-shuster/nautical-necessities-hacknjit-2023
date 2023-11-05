export default function MessageBubble({user, message, ...props}) {
    return (
        <>
            <div {...props} className={'rounded-lg p-5 flex flex-col'}>
                <div className={'rounded-lg'}>
                    <p className={'bg-blue-500 rounded-b-3xl rounded-tr-3xl p-5'}>{message}</p>
                </div>
                <p><i>{user}</i></p>
            </div>
        </>
    )
}