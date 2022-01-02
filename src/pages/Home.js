import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

import ListUserScenarii from '../components/ListUserScenarii/ListUserScenarii'

const Home = () => {
    const { auth } = useSelector((state) => state)

    return (
        <div className="page">
            <img src="ban.png" className="img-fluid" alt="banniere du site" />

            <section className="mtb-80">
                <div className="container">
                    <h1 className="title">Maître du Jeu (MJ) Virtuel</h1>
                    <div className="pb-30">
                        Nous vous proposons de jouer au jeu de rôles seul, à deux ou plus, grâce à notre <span className="txt-bold txt-green">MJ Virtuel</span>. Il vous
                        suffira de créer votre fiche de personnage, puis de choisir un scénario et enfin de partir à l'aventure !
                    </div>
                    <div>
                        <span className="txt-bold txt-green">MJ Virtuel</span> est un site communautaire, qui donne la possibilité à ses membres de pouvoir jouer au jeu de rôle, mais aussi de créer vos propres
                        scénarios. Vous pourrez les partager et les jouer avec vos amis.
                    </div>
                </div>
            </section>

            <section className="ptb-80 bg-gray-100">
                <div className="container">
                    <h1 className="title">Comment ça marche ?</h1>
                    <div className="pb-80">
                        C'est facile, comme dans tout jeu de rôle, commencez par créer un personnage. Si vous ne savez pas comment faire, rendez-vous
                        sur: <a href='https://www.aidedd.org/' rel="noreferrer" className="txt-green" target="_blank">aidedd</a> où vous trouverez toute l'aide nécessaire.
                    </div>
                    <div className="flex flex-jc-space-around">
                        <div className="card bg-white">
                            <div className="card-title txt-center">Etape 1</div>
                            <div className="card-body">
                                Créez votre personnage
                            </div>
                        </div>
                        <div className="card bg-white">
                            <div className="card-title txt-center">Etape 2</div>
                            <div className="card-body">
                                Préparer vos dés
                            </div>
                        </div>
                        <div className="card bg-white">
                            <div className="card-title txt-center">Etape 3</div>
                            <div className="card-body">
                                Choissez un scénario
                            </div>
                        </div>
                        <div className="card bg-white">
                            <div className="card-title txt-center">Etape 4</div>
                            <div className="card-body">
                                Partir à l'aventure
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ptb-80">
                <div className="container">
                    {!auth && <>
                        <h1 className="title">Créer un scénario</h1>
                        <div className="pb-30">
                            Un scénario, c'est comme un livre dont vous êtes le héro. Vous créer l'histoire en petits morceaux et laissez le choix au joueur de prendre telle ou telle décision.
                            Lui jouera au dé, pour savoir s'il a réussi où non l'action. C'est vous qui choissez le niveau de difficulté et ce qui se passe suivant le résultat.
                        </div>
                        <div className="pb-80">
                            Vous décidez aussi des rencontres et des récompenses obtenues par les héros. Pour ça il vous suffit de créer votre compte ou de vous connecter.
                        </div>
                        <div className="flex flex-jc-space-around">
                            <Link className="btn btn-green" to={`/register`}>Créer votre compte</Link>
                            <Link className="btn btn-beige" to={`/login`}>Vous connecter</Link>
                        </div>
                    </>}

                    {auth && <>
                        <ListUserScenarii />
                    </>}
                </div>
            </section>
        </div>
    )
}

export default Home