const relevantTopics = [
	{		
        id: 3, 
        name: "Repositório Lockey",
        content: "Trabalho voltado a segurança digital. Quiz que verifica seu nível de conhecimento e entrega recomendações e dicas de segurança para resolvê-las. Visite o repositório pela navbar."
    },
    {
        id: 4, 
        name: "Repositório Site Pessoal",
        content: "Página pessoal linkada as APIS do GitHub, com minhas informações e projetos. Trabalho da disciplina de DIW seguindo as especificações do projeto. Visite o repositório pela navbar."
    }
];
const createModal = (topic_id) => {

    const topic = relevantTopics.find(topic => topic.id == topic_id);

    if(!topic) {
        return;
    }

    const title = document.getElementById("relevant-title");
    title.innerHTML = topic.name;

    const body = document.getElementById("relevant-body");
    body.innerHTML = topic.content;


}

const createRelavantTopicSection = () => {
    let contentRow = document.getElementById("relevant-row");


    relevantTopics.forEach(topic => {
        
        contentRow.innerHTML += createTopicCard(topic);
        
    });

}

const createTopicCard = (topic) => {
    const topicContent = topic.content.substr(0, 150) + (topic.content.length > 150 ? '...' : '');

    let topicCard = `
    <div class="col-md-6 pb-5">
        <div class="card border-0">
            <div class="content">
                <h3 class="pb-3">${topic.name}</h3>
                <p>${topicContent}</p>
                <button class="btn btn-outline-info mt-3" onclick="createModal(${topic.id})" data-bs-toggle="modal" data-bs-target="#myModal"><span>Veja Mais</span></button>
            </div>
        </div>
    </div>
    `;

    return topicCard;
}

createRelavantTopicSection();

function filterByKeyword(filterKeyword) {
	if (filterKeyword === ' ' || filterKeyword === ''){
		return;
	}
	
	let divSearch = document.getElementById('filteredList');
	
	if (divSearch && divSearch.firstChild){
		divSearch.removeChild(divSearch.firstChild);
	}
			
	const elementHomeID = "relevant-row";
	let newFilteredUl = document.createElement('ul'),
		newLi = document.createElement('li'), 
		list = [];
	
	let cardsHackers = JSON.parse(localStorage.getItem('hackerCard'));
			
	(cardsHackers || []).forEach(e => {
		list.push(e)
	});
	
	nodesHome = document.querySelector('#'+elementHomeID).childNodes;
	nodesHome.forEach(item => {
		if (item && item.nodeType && item.nodeType !== 1 && item.nextSibling) {
			list.push(item);
		}
	})
					
	try {
		(list || []).forEach(item => {
			if (item && item.nodeType && item.nodeType !== 1 && item.nextSibling) {
				let textItem = item.nextSibling.innerText.toLowerCase();
				filterKeyword = filterKeyword.toLowerCase();
			
				if (textItem.indexOf(filterKeyword) !== -1) {
					let newLiText = document.createElement('p')
					let id

					console.log(item)

					if (item && item.id) {
						id = item.id;
					} else if (item.parentElement && item.parentElement.id) {
						id = item.parentElement.id;
					}
					

					newLiText.innerHTML = '<a href="#'+id+'" title='+item.nextSibling.innerText+'">'+item.nextSibling.innerText+'</a>'
					newLi.appendChild(newLiText)
				}
			} else if (item && item.id) {
				let textItem = item.title.toLowerCase();
				filterKeyword = filterKeyword.toLowerCase();
			
				if (textItem.indexOf(filterKeyword) !== -1) {
					let newLiText = document.createElement('p')
					let id

					if (item && item.id) {
						id = item.id;
					}
					
					newLiText.innerHTML = '<a href="hackers.html#'+id+'" title='+item.innerText+'">'+item.innerText+'</a>'
					newLi.appendChild(newLiText)
				}
			}
		})

		if (newLi) {
			newFilteredUl.appendChild(newLi)
		}
	} catch (e) { 
	  console.error(e)
	}
	
	return newFilteredUl
}

let button = document.querySelector('#search')

button.onclick = function() {
	
	let keyword = document.querySelector('#keyword').value

	let filteredListItem = document.querySelector('#filteredList')
	
	filteredListItem.className += ' shadow p-5';

	if(!keyword) {
		filteredListItem.innerHTML = "Nada encontrado.";
		return;
	}

	let newList = filterByKeyword(keyword)
	const lis = newList.getElementsByTagName('li');

	for (let item of lis) {
		item.innerText.length > 0 ? null : newList.removeChild(item);
	}

	if(lis.length === 0) return filteredListItem.innerHTML = "Nada encontrado.";

	filteredListItem.appendChild(newList);

}
