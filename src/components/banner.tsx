export const Banner = () => {
    return (
        <section className="flex p-6 py-20 justify-center">
            <div className="flex w-10/12 justify-center items-center gap-6 h-[400px] *:h-full">
                <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
                    <img
                        src="https://picsum.photos/seed/200/200"
                        alt="Banner 1"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg aspect-video">
                    <img
                        src="https://picsum.photos/seed/201/200"
                        alt="Banner 2"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};