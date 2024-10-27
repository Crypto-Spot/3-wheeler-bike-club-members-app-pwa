

export function About() {
    return (
        <div className="flex flex-col items-center py-12 gap-6">
            {/** top */}
            <div className="flex flex-col w-[36rem] gap-2 items-center">
                <p className="text-4xl text-yellow-400 font-semibold">ABOUT THREE WHEELER</p>
                <p className="text-center">The 3 Wheeler Bike Club aims to empower KEKE drivers by using blockchain technology to improve their lives. Many drivers work hard but earn little, so our goal is to help them break free from this cycle of hardship.</p>
            </div>
            {/** down */}
            <div className="flex flex-col w-[36rem] gap-2 items-center">
                <p className="text-4xl text-yellow-400 font-semibold">MISSION</p>
                <p className="text-center">The 3 Wheeler Bike Club aims to empower KEKE drivers by using blockchain technology to improve their lives. Many drivers work hard but earn little, so our goal is to help them break free from this cycle of hardship.</p>
            </div>
        </div>
    );
}