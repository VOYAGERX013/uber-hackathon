import React, { useState, useEffect } from 'react'
import './suggestion.css'
import axios from "axios"

export default function Suggestion() {

    const [articleTitles, setArticleTitles] = useState()
    const [articleLinks, setArticleLinks] = useState()
    const [articleDescs, setArticleDescs] = useState()

    function convertStrToList(text){
        return String(text).split(",");
    }

    useEffect(()=>{
        axios.post("http://localhost:8000/api/get-user/", null, { withCredentials: true })
            .then(res => {
                if (res.data.success){
                    let email = res.data.result.email;
                    axios.post("http://localhost:8000/api/suggestion/fetch-suggestions/", { email: email }, { withCredentials: true })
                        .then(res => {
                            console.log(res.data)
                            if (res.data.success){
                                setArticleLinks(convertStrToList(res.data.suggestions.links));
                                setArticleTitles(convertStrToList(res.data.suggestions.titles));
                                setArticleDescs(convertStrToList(res.data.suggestions.descs))
                            }
                        })
                }
            })
            .catch(err => console.log(err))
    }, [])

    function openurl(link){
        const newWindow = window.open(link.replace("'", ""), "_blank")
        if (newWindow) newWindow.opener = null
    }

    return (
        <div className = "wrap">
            <div className = "name" id="suggestionname">
                Article Suggestions
            </div>
            <div className = "desc" id = "suggestiondesc">
                Here are some suggested articles personalized for you!
            </div>
            <div className='suggestedcontentlist'>
                {articleTitles && articleTitles.map((e, idx) => {
                    return (
                        <div className="suggestedwrap" onClick={() => {
                            openurl(articleLinks[idx].replace("'", "").replace('"', ""))
                        }}>
                            <div className="suggestedinnerwrap">
                                <div className="suggestedtitle">{e.slice(1, -1)}</div>
                                <div className="suggestedsub">{articleDescs && articleDescs[idx].slice(1, -1)}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
