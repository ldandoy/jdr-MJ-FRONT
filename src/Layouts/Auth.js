import styles from "../styles/Auth.module.css"

const Auth = ({ children }) => {
    return (<div className={styles.pageAuth}>
        <main>
            <section className="pt-20">
                <div className="card w-50 mx-auto">
                    { children }
                </div>
            </section>
        </main>
    </div>)
}

export default Auth