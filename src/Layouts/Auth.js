const Auth = ({ children }) => {
    return (<div className="page pageAuth">
        <main>
            <section className="pt-20">
                <div className="card w-50 mx-auto bg-light">
                    { children }
                </div>
            </section>
        </main>
    </div>)
}

export default Auth