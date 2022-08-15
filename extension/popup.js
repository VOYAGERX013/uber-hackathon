const highlight = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    fetch('http://localhost:8000/api/summarize/link/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: tabs[0].url,
      }),
    })
      .then((res) => res.text())
      .then((json) => {
        console.log(json)
        json = JSON.parse(json)

        if (json.success) {
          console.log(json.sentences)
          chrome.action.setBadgeText({ text: '1' })
        }
      })
  })
}

const fake_highlight = () => {
  // let context = document.querySelector("body")
  // let instance = new Mark(context)
  // instance.mark("InBrief");
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: 'getText' }, function (
      response,
    ) {})
  })
}

const showLoading = () => {
  document.querySelector('.sub-container').style.opacity = '0.5'
  const spinner = document.getElementsByClassName('loader')[0]
  spinner.style.display = 'inline'
}

const completeLoading = () => {
  document.querySelector('.sub-container').style.opacity = '1'
  document.getElementsByClassName('loader')[0].style.display = 'none'
}

const summarize = () => {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    showLoading()
    fetch('http://localhost:8000/api/summarize/extension-link/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        link: tabs[0].url,
      }),
    })
      .then((res) => res.text())
      .then((json) => {
        if (json) {
          completeLoading()
          document.getElementsByClassName('container')[0].style.height = '550px'
          document.getElementsByClassName('container')[0].style.padding = '20px'
          json = JSON.parse(json)
          console.log(json.summary)
          if (json.success) {
            let list = document.createElement('ul')
            list.style.padding = '25px'
            let item
            for (let i = 0; i < json.summary.length; i++) {
              item = document.createElement('li')
              item.innerHTML = json.summary[i]
              list.appendChild(item)
              document
                .getElementsByClassName('sub-container')[0]
                .appendChild(list)
            }
          } else {
            errorMsg = document.createElement('h3')
            errorMsg.innerHTML = 'An error occurred'
            document
              .getElementsByClassName('sub-container')[0]
              .appendChild(errorMsg)
          }
        }
      })
  })
}

document
  .getElementsByClassName('summarize-btn')[0]
  .addEventListener('click', summarize)
