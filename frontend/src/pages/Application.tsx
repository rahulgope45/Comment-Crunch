import { type JSX } from 'react'

function Application(): JSX.Element {
    return (
        <div className='flex flex-col items-center justify-cente mt-40'>
            {/* Input Section */}
            <div >
                <form className='flex gap-5'>
                    <input
                    className="w-[643px] h-[70px] border p-5"
                    type="text"
                    placeholder="Enter Youtube Url"
                />
                <input
                    className="w-[100px] h-[70px] border p-5"
                    type="number"
                    max={50}
                    placeholder="No. of"
                />
                </form>

            </div>
        </div>
    )
}

export default Application