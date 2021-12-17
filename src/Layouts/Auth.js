import styles from "../styles/Auth.module.css"

const Auth = ({ children }) => {
    return (<div className={styles.pageAuth}>
        <main>
            <section className="pt-20">
                { children }
            </section>
        </main>
    </div>)
}

export default Auth