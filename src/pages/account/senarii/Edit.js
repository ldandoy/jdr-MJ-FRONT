import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useParams, useHistory } from 'react-router-dom'

const Edit = () => {
    const { auth } = useSelector((state) => state)
    const [ senario, setSenario ] = useState(null)
    const { senarii_id } = useParams()
    let history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!auth || !auth.user || !auth.user.senarii) return
        
        let senarioFiltered = auth.user.senarii.filter(function (el) {
            return el._id === senarii_id
        })

        setSenario(senarioFiltered[0])

    }, [auth, senarii_id])

    const onChangeInputHandler = (e) => {
        const {name, value} = e.target
        setSenario({...senario, [name]: value})
    }

    const onChangeInputSectionHandler = (e, index) => {
        const {name, value} = e.target

        let tmpSections = senario.sections

        tmpSections[index][name] = value

        setSenario({...senario, "sections": tmpSections})
    }

    const onChangeInputActionHandler = (e, indexSection, indexAction) => {
        const {name, value} = e.target

        let tmpSections = senario.sections

        tmpSections[indexSection]["actions"][indexAction][name] = value

        setSenario({...senario, "sections": tmpSections})
    }

    const addSection = (e) => {
        e.preventDefault()

        let tmpSections = senario.sections

        tmpSections.push({
            title: "",
            description: "",
            picture: "",
            actions: []
        })

        setSenario({...senario, "sections": tmpSections})
    }

    const delSection = (e, indexSection) => {
        e.preventDefault()

        let tmpSections = senario.sections

        tmpSections.splice(indexSection, 1)

        setSenario({...senario, "sections": tmpSections})
    }

    const addAction = (e, indexSection) => {
        e.preventDefault()

        let tmpSections = senario.sections

        tmpSections[indexSection].actions.push({
            label: "",
            type: "goto",
            url: ""
        })

        setSenario({...senario, "sections": tmpSections})
    }

    const delAction = (e, indexSection, indexAction) => {
        e.preventDefault()

        let tmpSections = senario.sections

        tmpSections[indexSection].actions.splice(indexAction, 1)

        setSenario({...senario, "sections": tmpSections})
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        // dispatch(updateSenario(auth, senario, history))
    }

    return (<>
        <img src="/ban.png" className="img-fluid" alt="banniere du site" />
        <section>
            { senario && <>
                <div className="container mt-50">
                    <h1 className="title">Editer le scénario: {senario.title}</h1>
                </div>
                <div className="container mt-30">
                    <form className="form-no-bordered" onSubmit={onSubmitHandler}>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h2 className="mb-20">Informations générales</h2>
                                <div className="card bg-green-100 mb-20">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Nom</label>
                                            <input type="text" name="title" value={senario.title} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez le titre" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Status du sénario</label>
                                            <select value={senario.status} name="status" className="form-input" onChange={onChangeInputHandler}>
                                                <option>Choissez un status</option>
                                                <option value="Brouillon">Brouillon</option>
                                                <option value="Béta">Béta</option>
                                                <option value="Publié">Publié</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Description</label>
                                            <textarea name="description" className="form-input" onChange={onChangeInputHandler} value={senario.description}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">système de règles utilisé</label>
                                            <select value={senario.universe} name="universe" className="form-input" onChange={onChangeInputHandler}>
                                                <option>Choissez un système de règles</option>
                                                <option value="DD20">DD20</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Nombre de personne conseillé pour jouer ce sénario</label>
                                            <input type="number" name="nbPersonne" value={senario.nbPersonne} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez le titre" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Durée de jeu (en heure)</label>
                                            <input type="number" name="duration" value={senario.duration} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez le titre" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="" className="form-label">Image illustrant le sénario</label>
                                            <input type="text" name="picture" value={senario.picture} className="form-input" onChange={onChangeInputHandler} placeholder="Entrez le titre" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="mb-20">Les sections</h2>
                                
                                {senario.sections.map((section, indexSection) =>
                                    <div className="card bg-green-100 mb-20" key={indexSection}>
                                        <div className="card-body">
                                            <div className="txt-right">
                                                <button onClick={(e) => delSection(e, indexSection)} className="btn btn-small btn-error">
                                                    Supprimer la section
                                                </button>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Titre de la section</label>
                                                <input type="text" name="title" value={section.title} className="form-input" onChange={(e) => onChangeInputSectionHandler(e, indexSection)} placeholder="Entrez le titre" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Description</label>
                                                <textarea name="description" className="form-input" onChange={(e) => onChangeInputSectionHandler(e, indexSection)} value={section.description}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="" className="form-label">Image illustrant la section</label>
                                                <input type="text" name="picture" value={section.picture} className="form-input" onChange={(e) => onChangeInputSectionHandler(e, indexSection)} placeholder="Entrez le titre" />
                                            </div>

                                            <h3>Les actions</h3>
                                            { section.actions.map((action, indexAction) => <div className="card bg-green-200 mb-20" key={`action-${indexSection}-${indexAction}`}>
                                                <div className="card-body">
                                                    <div className="txt-right">
                                                        <button onClick={(e) => delAction(e, indexSection, indexAction)} className="btn btn-small btn-error">
                                                            Supprimer l'action
                                                        </button>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="form-label">Label pour l'action</label>
                                                        <input type="text" name="label" value={action.label} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="" className="form-label">Type d'action</label>
                                                        <select name="type" value={action.type} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}>
                                                            <option value="goto">Goto</option>
                                                            <option value="testCompetence">Test de compétence</option>
                                                            <option value="combat">Combat</option>
                                                        </select>
                                                    </div>
                                                    {action.type === "goto" && <div className="form-group">
                                                        <label htmlFor="" className="form-label">Redirection une fois l'action effectué</label>
                                                        <select name="url" value={action.url} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}>
                                                            <option>Choississez une section</option>
                                                            {senario.sections.map((section, index) =>
                                                                <option value={`/sections/${index}`}>{section.title}</option>
                                                            )}
                                                        </select>
                                                    </div>}

                                                    {action.type === "testCompetence" && <>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Valeur seuil pour réussir le test</label>
                                                            <input type="number" name="success" value={action.success} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Compétence bonus pour réussir le test</label>
                                                            <input type="text" name="competence" value={action.competence} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Texte en cas de réussite</label>
                                                            <textarea name="textSuccess" value={action.textSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Label du bouton une fois le test réussit</label>
                                                            <textarea name="gotoLabelSuccess" value={action.gotoLabelSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Redirection une fois le test réussit</label>
                                                            <select name="gotoSuccess" value={action.gotoSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}>
                                                                <option>Choississez une section</option>
                                                                {senario.sections.map((section, index) =>
                                                                    <option value={`/sections/${index}`}>{section.title}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Texte en cas d'echec</label>
                                                            <textarea name="textFailed" value={action.textFailed} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Label du bouton une fois le test raté</label>
                                                            <textarea name="gotoLabelFailed" value={action.gotoLabelFailed} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Redirection une fois le test raté</label>
                                                            <select name="gotoFailed" value={action.gotoFailed} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}>
                                                                <option>Choississez une section</option>
                                                                {senario.sections.map((section, index) =>
                                                                    <option value={`/sections/${index}`}>{section.title}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </>}

                                                    {action.type === "combat" && <>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Texte combat</label>
                                                            <textarea name="textCombat" value={action.textCombat} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Texte en cas de réussite</label>
                                                            <textarea name="textSuccess" value={action.textSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Label du bouton une fois le combat réussit</label>
                                                            <textarea name="gotoLabelSuccess" value={action.gotoLabelSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Redirection une fois le combat réussit</label>
                                                            <select name="gotoSuccess" value={action.gotoSuccess} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)}>
                                                                <option>Choississez une section</option>
                                                                {senario.sections.map((section, index) =>
                                                                    <option value={`/sections/${index}`}>{section.title}</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="" className="form-label">Texte en cas d'echec</label>
                                                            <textarea name="textFailed" value={action.textFailed} className="form-input" onChange={(e) => onChangeInputActionHandler(e, indexSection, indexAction)} placeholder="Entrez le titre"></textarea>
                                                        </div>
                                                    </>}
                                                </div>
                                            </div>)}
                                            <button onClick={(e) => addAction(e, indexSection)} className="btn bg-green-1000 txt-white-100 w-100">
                                                Ajouter une action
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button onClick={addSection} className="btn btn-green w-100">
                                    Ajouter une section
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="form-group">
                                <button className="btn bg-green txt-white-100 w-100 p-20">
                                    Mettre à jour
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </> }
        </section>
    </>)
}

export default Edit
