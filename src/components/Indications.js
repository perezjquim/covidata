import React from 'react';
import { Swipeable } from 'react-swipeable';

import {
    Page,
    List,
    ListItem
} from 'react-onsenui';

import DownArrowIcon from '../icons/down-arrow.svg';
import UpArrowIcon from '../icons/up-arrow.svg';

import '../css/Indications.css';

import NavBar from './NavBar';
import Title from '../containers/Title';

class Indications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }

    handleClick(index) {
        var content = document.getElementById("content-" + index);
        var icon = document.getElementById("icon-" + index);

        if (content.style.display === "block") {
            content.style.display = "none";
            icon.src = DownArrowIcon;
        } else {
            content.style.display = "block";
            icon.src = UpArrowIcon;
        }
    }

    handleSearch(placeholderItem) {
        var input, filter, country;
        input = document.getElementById("search-indications");
        filter = input.value.toUpperCase();
        country = document.getElementsByClassName("indication-listitem");

        Object.values(placeholderItem).map(function (element, index) {
            if (element.title.toUpperCase().indexOf(filter) > -1) {
                country[index].style.display = "block";
            } else {
                country[index].style.display = "none";
            }
        });
    }

    render() {
        const placeholderItem = [
            { type: "GERAL", title: "Quando posso abrir o meu estabelecimento / empresa / serviço e qual o horário recomendado?", content: "O faseamento e horários para a reabertura dos estabelecimentos/ empresas/ serviços foi definido pelo Governo em diplomas próprios. A permissão de abertura faseada dos diferentes estabelecimentos/empresas/serviços e o horário em que podem operar são definidos pelo Governo em diplomas próprios." },
            { type: "GERAL", title: "As Orientações Técnicas da Direcção-Geral da Saúde são de cumprimento obrigatório?", content: "As Orientações Técnicas emanadas pela Direção-Geral da Saúde no âmbito da pandemia de COVID-19 servem como referencial de conduta e de boas práticas a seguir, por forma a minimizar o risco de transmissão de SARS-CoV-2 e o impacto da doença. Desta forma, o objetivo é sensibilizar e promover a capacitação das pessoas/população, por forma a conseguirem adaptar as suas atividades. Não obstante o anteriormente descrito, estas podem ter força de lei quando assim for definido pelo Governo em diploma próprio." },
            { type: "GERAL", title: "É obrigatório elaborar um plano de contingência sobre os procedimentos a tomar perante a identificação de um caso suspeito de COVID-19? Este deve ser público?", content: "Uma boa prática perante a abertura dos estabelecimentos é a elaboração de planos de contingência, isto é, determinar que procedimentos devem ser seguidos perante a identificação de um caso suspeito de COVID-19. Não há qualquer obrigatoriedade em publicar o plano de contingência, mas todos os colaboradores dos estabelecimentos/empresas devem conhecer os procedimentos a tomar perante a identificação de um caso suspeito de COVID-19." },
            { type: "GERAL", title: "Quando não for possível ter uma sala dedicada/própria para o “isolamento” num estabelecimento/empresa, como se deve proceder?", content: "As áreas de “isolamento” visam impedir que colaboradores ou clientes sejam expostos ao SARS-CoV-2, quando se identifica que uma pessoa tem sintomas compatíveis com a doença. Tal como referido na Orientação nº 006/2020 a área de “isolamento” não tem de ser uma sala ou um gabinete, podendo ser uma secção ou zona, desde que cumpra o objetivo de separar o caso suspeito das restantes pessoas do estabelecimento/empresa. A pessoa com sintomas deve apenas ser mantida na área de “isolamento”, com máscara cirúrgica, até serem acionados os devidos meios – telefonema para o SNS24 e cumprimento das orientações emanadas por esta linha." },
            { type: "LOTACAO", title: "É obrigatória a redução da lotação máxima dos estabelecimentos de restauração e bebidas exemplificada no anexo da Orientação nº 023/2020?", content: "As figuras servem somente como sugestões para disposição das mesas e clientes. Esta sugestão deve ser adaptada às especificidades dos locais de restauração e bebidas e às características dos utilizadores (por exemplo, se coabitantes ou não)." },
            { type: "LOTACAO", title: "Qual é a lotação máxima dos estabelecimentos de restauração e bebida? Deve estar afixada na entrada?", content: "A lotação máxima permitida e a afixação na entrada nos diferentes estabelecimentos são definidas pelo Governo através de diplomas próprios e devem seguir a legislação em vigor." },
            { type: "LOTACAO", title: "Os corredores de passagem devem ter 4 metros para os clientes circularem (2 metros para cada lada do cliente em deslocação)?", content: "Os corredores de passagem devem garantir o distanciamento recomendado pela Direção-Geral da Saúde entre clientes que se encontrem sentados. Visto o tempo de exposição entre um cliente que circula e um cliente sentado ser limitado, a distância nestes corredores não tem de ser de 4 metros. Não obstante o anteriormente descrito, devem ser evitadas filas nos corredores de passagem (por exemplo, para o pagamento ou para o acesso às instalações sanitárias) uma vez que há o aumento do tempo de exposição entre clientes que circulam e que estão sentados. Nos corredores onde se prevê filas, deve ser assegurada uma distância de 2 metros entre todas as pessoas." },
            { type: "LOTACAO", title: "As barreiras físicas, de materiais como acrílico, vidro ou cortinas, podem servir para reduzir o distanciamento de 2 metros?", content: "A barreira física pode ser um método que contribui para minimizar a transmissão entre pessoas durante o período em que as pessoas têm de estar sem a máscara. A barreira física permite também reduzir o distanciamento físico recomendado pela Direção-Geral da Saúde." },
            { type: "PROTECAO", title: "O uso de máscara pelos clientes é obrigatório na entrada e circulação pelo estabelecimento de restauração e bebidas?", content: "O uso de máscara pelos clientes deve ser considerado durante a circulação dentro de estabelecimentos fechados, quando não estão estiverem na sua mesa e/ou na refeição." },
            { type: "PROTECAO", title: "Quando é recomendado o uso de máscara, esta pode ser substituída por viseira?", content: "A viseira deve ser usada complementarmente com método barreira que permita proteger a boca e o nariz." },
            { type: "PROTECAO", title: "Como fazer quando os clientes, devido ao teor do serviço prestado, não podem usar máscara (por exemplo, tratamentos de rosto, cortar a barba, comer, etc)?", content: "Os colaboradores devem usar máscara no atendimento a clientes, principalmente quando prestam um serviço a uma distância inferior ao recomendado pela Direção-Geral da Saúde. Sempre que houver contacto físico com o cliente, devem haver um reforço da higienização das mãos após o procedimento." },
            { type: "HIGIENE", title: "Para servir alimentos ou bebida deve ser dada preferência aos materiais descartáveis ou pode continuar a usar-se loiça? É possível lavar a loiça sem máquina?", content: "A escolha do material utilizado deve ser feita pelo respetivo estabelecimento, tendo em conta as suas características. Já existem no mercado, estes consumíveis descartáveis sem plástico, com menor impacto ambiental. Independentemente do tipo de material escolhido, o estabelecimento deve certificar-se que as normas de limpeza e higienização sejam cumpridas, seguindo as boas práticas e/ou orientações específicas. A lavagem da loiça deve ser feita na máquina de lavar loiça (forma preferencial) com um ciclo que contemple: pré-lavagem (para remover a sujidade/gorduras), seguido de lavagem com água mais quente, finalizando o ciclo com a desinfeção térmica. Não havendo máquina, a loiça poderá ser lavada à mão com água e detergente, imersa em solução de hipoclorito de sódio a 0,05% durante pelo menos 5 minutos, enxaguando de seguida com a água à maior temperatura possível e deixando secar ao ar – não usar panos para secagem." },
            { type: "COVID19", title: "O que são os Coronavírus?", content: "Os coronavírus pertencem à família Coronaviridae que integra vírus que podem causar infeção no Homem, noutros mamíferos (por exemplo nos morcegos, camelos, civetas) e nas aves. Até à data, conhecemos oito coronavírus que infetam e podem causar doença no Homem. Normalmente, estas infeções afetam o sistema respiratório, podendo ser semelhantes às constipações comuns ou evoluir para uma doença mais grave, como a pneumonia. Dos coronavírus que infetam o Homem o SARS-CoV, o MERS-CoV e o SARS-CoV-2 saltaram a barreira das espécies, ou seja, estes vírus foram transmitidos ao Homem a partir de um animal reservatório ou hospedeiro desses vírus. O SARS-CoV originou uma epidemia em 2002-2003 e o MERS-CoV emergiu em 2012 e foi causando casos esporádicos de infeção humana ou pequenos clusters de casos de doença respiratória. O novo coronavírus, o SARS-CoV-2, que origina a doença designada COVID-19, foi identificado pela primeira vez em dezembro de 2019, na China." },
            { type: "COVID19", title: "O que é o Novo Coronavírus?", content: "O novo coronavírus, designado SARS-CoV-2, foi identificado pela primeira vez em dezembro de 2019 na China, na cidade de Wuhan. Este novo agente nunca tinha sido identificado anteriormente em seres humanos. A fonte da infeção é ainda desconhecida. Ainda está em investigação a via de transmissão. A transmissão pessoa a pessoa foi confirmada e já existe infeção em vários países e em pessoas que não tinham visitado o mercado de Wuhan. A investigação prossegue." },
            { type: "COVID19", title: "O que é a COVID-19?", content: "COVID-19 é a designação dada pela Organização Mundial da Saúde para identificar a doença provocada pelo novo coronavírus SARS-CoV-2. Este novo coronavírus foi identificado pela primeira vez em dezembro de 2019 na China, na cidade de Wuhan. Os casos iniciais da doença COVID-19 foram associados a um mercado em Wuhan (Wuhan’s Huanan Seafood Wholesale Market). O mercado foi encerrado a 1 de janeiro de 2020, mas a doença foi progredindo desencadeando uma epidemia mundial ou pandemia." },
            { type: "COVID19", title: "SARS-CoV-2 é o mesmo que COVID-19?", content: "SARS-CoV-2 é o nome do novo vírus e significa Severe Acute Respiratory Syndrome (Síndrome Respiratória Aguda Grave) – Coronavírus – 2. COVID-19 (Coronavirus Disease) é o nome da doença e significa Doença por Coronavírus, fazendo referência ao ano em que foi descoberta, em 2019. Existe outro coronavírus que causa uma Síndrome Respiratória Aguda Grave, que foi identificado em 2002, este é chamado SARS-CoV por isso o Novo Coronavírus é designado por SARS-CoV-2." },
            { type: "COVID19", title: "Qual é a origem do Novo Coronavírus?", content: "Supõe-se que o SARS-CoV-2 tenha sido introduzido na espécie humana por transmissão zoonótica, ou seja, a partir de uma espécie animal. Vírus muito semelhantes foram identificados em morcegos e em pangolins, mas não é ainda claro o envolvimento destes animais na emergência do SARS-CoV-2 na espécie humana. As investigações continuam no sentido de esclarecer este processo para que melhor nos possamos defender de novas introduções." },
            { type: "COVID19", title: "Já houve algum surto com Coronavírus em anos anteriores? ", content: "Sim. Em anos anteriores foram identificados alguns coronavírus que provocaram surtos e infeções respiratórias graves em humanos. Exemplos disto foram: entre 2002 e 2003 a síndrome respiratória aguda grave (infeção provocada pelo coronavírus SARS-CoV); em 2012 a síndrome respiratória do Médio Oriente (infeção provocada pelo coronavírus MERS-CoV)." },
            { type: "COVID19", title: "Qual a situação atual e o risco em Portugal da COVID-19? ", content: "Face a esta ameaça de Saúde Pública, foram definidas fases de resposta que incluem três níveis e seis subníveis, de acordo com a avaliação de risco para COVID-19 e o seu impacto para Portugal. Atualmente, Portugal encontra-se na fase de Mitigação, na qual há transmissão local em ambiente fechado, bem como transmissão comunitária. A 19 de março de 2020, foi declarado estado de emergência, como consequência da evolução da pandemia em Portugal. A avaliação de risco encontra-se em atualização permanente. A Direção-Geral da Saúde (DGS) emite comunicados diários com o sumário da informação e recomendações que pode encontrar neste microsite dedicado ao COVID-19 (https://covid19.min-saude.pt/). O Centro Europeu de Prevenção e Controlo das Doenças (ECDC) disponibiliza no seu site as informações de contexto europeu (https://www.ecdc.europa.eu/en) e a Organização Mundial da Saúde o ponto da situação a nível mundial (https://www.who.int/emergencies/diseases/novel-coronavirus-2019)." },
            { type: "COVID19", title: "Quais os sinais e sintomas associados à COVID-19?", content: "Os sinais e sintomas da COVID-19 variam em gravidade, desde a ausência de sintomas (sendo assintomáticos) até febre (temperatura ≥ 38.0ºC), tosse, dor de garganta, cansaço e dores musculares e, nos casos mais graves, pneumonia grave, síndrome respiratória aguda grave, septicémia, choque sético e eventual morte. Os dados mostram que o agravamento da situação clínica pode ocorrer rapidamente, geralmente durante a segunda semana da doença. Recentemente, foi também verificada anosmia (perda do olfato) e em alguns casos a perda do paladar, como sintoma da COVID-19. Existem evidências da Coreia do Sul, China e Itália de que doentes com COVID-19 desenvolveram perda parcial ou total do olfato, em alguns casos na ausência de outros sintomas." },
            { type: "COVID19", title: "Qual é a percentagem de doença ligeira e grave por COVID-19?", content: "80% dos casos de COVID-19 apresentam doença ligeira, isto é, sintomas ligeiros, nomeadamente, febre, rinorreia (pingo no nariz), cefaleia (dores de cabeça) e mialgias (dores no corpo). Apenas 15% dos casos apresentam um quadro grave, com pneumonia, dificuldade respiratória, com necessidade de internamento e 5% podem eventualmente precisar de cuidados intensivos com necessidade de ventilação. A maioria dos óbitos são verificados nas pessoas mais idosas e com outras comorbilidades (outras doenças crónicas)." },
            { type: "COVID19", title: "É necessário o internamento em todos os casos de COVID-19?", content: "Nem todos os casos confirmados de COVID-19 necessitam de internamento, desde que apresentem um quadro clínico ligeiro e estável, tenham condições para permanecer em casa e esteja garantido o acompanhamento da equipa de saúde no domicílio." },
            { type: "COVID19", title: "A COVID-19 é o mesmo que gripe?", content: "Não. Embora os vírus que causam a COVID-19 e a gripe sejam transmitidos de pessoa para pessoa e possam causar sintomas semelhantes, os dois vírus são muito diferentes e não se comportam da mesma maneira. A doença COVID-19 é causada por um novo vírus que se designa SARS-CoV-2 e a gripe é causada pelo vírus influenza que circula na população há muitas centenas de anos. Ao contrário da gripe, para a COVID-19 a população mundial não apresenta qualquer tipo de anticorpos protetores ou imunidade. Desta forma, toda a população é suscetível à doença. Enquanto que para a gripe existe uma vacina e antivirais específicos para o tratamento, para a COVID-19 ainda se encontram em desenvolvimento." },
            { type: "COVID19", title: "Qual a diferença entre epidemia e pandemia?", content: "Uma epidemia corresponde ao aumento considerável do número de casos de determinada doença, em várias regiões ou países, num determinado período de tempo. Uma pandemia é a disseminação mundial de uma doença, que se espalhou por diferentes continentes, afetando geralmente um grande número de pessoas, com transmissão sustentada e na comunidade. Na maioria das vezes está associada a uma grande disrupção social e coloca sobre enorme pressão os serviços de saúde a nível global." },
            { type: "COVID19", title: "O que é a quarentena (“isolamento profilático”) e o isolamento?", content: "A quarentena (“isolamento profilático”) e o isolamento são medidas de afastamento social essenciais em Saúde Pública. São especialmente utilizadas em resposta a uma epidemia e pretendem proteger a população pela quebra da cadeia de transmissão entre pessoas. A diferença entre a quarentena (“isolamento profilático”) e o isolamento parte do estado de doença da pessoa que se quer em afastamento social. Quarentena é utilizada em pessoas que se pressupõe serem saudáveis, mas possam ter estado em contacto com um doente confirmado de COVID-19. Isolamento é a medida utilizada em pessoas doentes, para que através do afastamento social não contagiem outros cidadãos. Estas medidas de afastamento social são das mais efetivas para quebrar as cadeias de transmissão, e por isso utilizadas pelas Autoridades de Saúde para minimizar a transmissão da COVID-19." },
            { type: "TRANSMISSAO", title: "Como se transmite?", content: "A COVID-19 transmite-se pessoa-a-pessoa por contacto próximo com pessoas infetadas pelo SARS-CoV-2 (transmissão direta), ou através do contacto com superfícies e objetos contaminados (transmissão indireta). A transmissão por contacto próximo ocorre principalmente através de gotículas que contêm partículas virais que são libertadas pelo nariz ou boca de pessoas infetadas, quando tossem ou espirram, e que podem atingir diretamente a boca, nariz e olhos de quem estiver próximo. As gotículas podem depositar-se nos objetos ou superfícies que rodeiam a pessoa infetada e, desta forma, infetar outras pessoas quando tocam com as mãos nestes objetos ou superfícies, tocando depois nos seus olhos, nariz ou boca. Existem também evidências sugerindo que a transmissão pode ocorrer de uma pessoa infetada cerca de dois dias antes de manifestar sintomas." },
            { type: "TRANSMISSAO", title: "Qual é o período de incubação?", content: "Atualmente, estima-se que o período de incubação da doença (tempo decorrido desde a exposição ao vírus até ao aparecimento de sintomas) seja entre 1 e 14 dias." },
            { type: "TRANSMISSAO", title: "O que quer dizer “transmissão comunitária”?", content: "Transmissão comunitária significa que o vírus circula na comunidade sem que seja possível identificar a origem de todas as cadeias de transmissão." },
            { type: "TRANSMISSAO", title: "Antes do aparecimento de sintomas, a pessoa pode transmitir a infeção?", content: "A pessoa pode transmitir a infeção cerca de um a dois dias antes do aparecimento dos sintomas, no entanto, a pessoa é mais infeciosa durante o período sintomático, mesmo que os sintomas sejam leves e muito inespecíficos. Estima-se que o período infecioso dure de 7 a 12 dias em casos moderados e até duas semanas, em média, em casos graves." },
            { type: "TRANSMISSAO", title: "Os sintomas de COVID-19 são diferentes nas crianças e nos adultos?", content: "Não. Os sintomas de COVID-19 são semelhantes nas crianças e nos adultos. As crianças mostram, de uma forma geral, sintomas mais ligeiros e parecem registar, em proporção, menos casos de doença. Os sintomas relatados em crianças são inicialmente idênticos às constipações, como febre, corrimento nasal e tosse. Nalguns casos, foram também reportados vómitos e diarreia. Ainda não se sabe se algumas crianças podem estar em maior risco de doenças graves, por exemplo, crianças com condições médicas subjacentes e necessidades especiais de cuidados de saúde. Há muito mais a aprender sobre como a doença afeta as crianças e estão em curso investigações nesse sentido." },
            { type: "TRANSMISSAO", title: "As pessoas que têm a doença ficam imunes?", content: "De acordo com a evidência científica disponível à data, ainda não é possível confirmar se as pessoas infetadas com o SARS-CoV-2 desenvolvem imunidade protetora. O organismo humano pode ir ganhando anticorpos após a infeção e desenvolvimento da doença." },
            { type: "TRANSMISSAO", title: "O SARS-CoV-2 pode ser transmitido através das fezes?", content: "O risco de transmissão por SARS-CoV-2 a partir das fezes de uma pessoa infetada parece ser reduzido. Embora esta seja uma via de excreção do vírus, não parece ser uma via preferencial de transmissão." },
            { type: "TRANSMISSAO", title: "O COVID-19 pode ser transmitido através de alimentos, incluindo os refrigerados e congelados?", content: "Atualmente, não há evidência que suporte a transmissão do SARS-CoV-2 pelos alimentos.Porém, aplicando o princípio da precaução, a manutenção e o reforço das boas práticas de higiene e segurança alimentar durante a manipulação, preparação e coinfecção dos alimentos é recomendada.Assumindo o princípio da precaução, a OMS publicou no seu site algumas recomendações relativas às boas práticas de higiene e segurança alimentar assim como, a nível nacional, a Autoridade de Segurança Alimentar e Económica (ASAE)." },
            { type: "TRANSMISSAO", title: "Quanto tempo o vírus persiste numa superfície?", content: "O vírus pode sobreviver em superfícies durante horas ou até dias, se estas superfícies não forem limpas e desinfetadas com frequência.O tempo que o vírus persiste nas superfícies pode variar sob diferentes condições (por exemplo, tipo de superfície, temperatura ou humidade do ambiente e a carga viral inicial que originou a exposição). Estudos recentes mostram que o SARS-CoV-2 se pode manter viável em superfícies como plástico ou metal por um período máximo de cerca de 72 horas e em aerossóis por um período máximo de 3h. Em superfícies mais porosas como cartão, o SARS-CoV-2 pode manter-se viável por um período de 24h." },
            { type: "TRANSMISSAO", title: "O dinheiro é um veículo de transmissão da COVID-19?", content: "O dinheiro muda de mãos centenas ou até milhares de vezes durante a circulação, encontrando-se entre os objetos que, se for contaminado com vírus, ou outros microorganismos (como por exemplo, bactérias) pode servir de veículo de transmissão. Não será, no entanto, uma forma de transmissão comum da COVID-19. A higiene das mãos quando se manipula o dinheiro é uma boa prática que, independentemente do atual contexto de pandemia, deve ser sempre aplicada." },
            { type: "TRANSMISSAO", title: "Receber encomendas de outros países é um risco?", content: "Não. O risco de infeção por uma encomenda preparada e transportada do estrangeiro para Portugal é muito reduzido. Ainda que uma pessoa infetada com SARS-CoV-2 possa manusear um produto incluído numa encomenda, ou a sua embalagem, a probabilidade de ser infetado após esse produto ter sido exposto a condições atmosféricas e de transporte tão diferentes em termos de temperatura e humidade é muito reduzido." },
            { type: "TRANSMISSAO", title: "O clima quente vai parar o surto de COVID-19?", content: "De momento, não há evidência de que a propagação da COVID-19 irá diminuir quando o clima ficar mais quente. Ainda não é conhecido de que forma o clima ou a temperatura afetam a propagação do SARS-CoV-2." },
            { type: "TRANSMISSAO", title: "Devo desinfetar tablets, smartphones e computadores?", content: "Sim. Os ecrãs e os teclados devem ser limpos frequentemente, de preferência com toalhetes de limpeza e desinfeção rápida à base de álcool ou outro desinfetante com ação contra o vírus (ação virucida)." },
            { type: "TRANSMISSAO", title: "Há uma temperatura mínima para lavar a roupa quando há um caso confirmado de COVID-19 em casa?", content: "Se a pessoa tiver sintomas de COVID-19 ou for um caso confirmado, a roupa deve ser lavada em casa na máquina, a pelo menos 60-70ºC, mas pode ir até os 90ºC (ou seja, à temperatura mais elevada, que a roupa puder suportar). A roupa que não puder ser lavada a quente, deve ser lavada com ciclo de água morna (30-40ºC) e desinfetada de seguida com um ciclo desinfetante, apropriado para roupa branca ou de cor, consoante o tipo de roupa a lavar. Se não tiver máquina de lavar, lave as suas roupas com água quente com detergente e desinfete de seguida com o desinfetante apropriado para a roupa." },
            { type: "TRATAMENTO", title: "Qual é o tratamento?", content: "O tratamento para a infeção por este novo coronavírus é dirigido aos sinais e sintomas que os doentes apresentam e tem como objetivo proporcionar alívio e maior conforto aos doentes. À data, considerando o conhecimento científico atual e as recomendações da OMS, encontram-se em investigação, algumas estratégias terapêuticas apontadas como potenciais candidatos terapêuticos." },
            { type: "TRATAMENTO", title: "Existe uma vacina?", content: "Atualmente não existe vacina que previna a infeção por SARS-CoV-2. Sendo um vírus recentemente identificado, estão ainda em curso investigações em diversos países para o desenvolvimento de uma vacina com eficácia comprovada e que respeite os requisitos necessários de segurança." },
            { type: "TRATAMENTO", title: "Os antibióticos são efetivos a prevenir e tratar a COVID-19?", content: "Não, os antibióticos são dirigidos a bactérias, não tendo efeito contra vírus. A COVID-19 é provocada por um vírus, o SARS-CoV-2, e, como tal, os antibióticos não são efetivos na prevenção ou tratamento. O uso indevido e sem indicação médica de antibióticos poderá contribuir para o aumento das resistências a antimicrobianos (antibióticos) com efeito negativo para a saúde individual e coletiva." },
            { type: "PREVENCAO", title: "O que são medidas de higiene e etiqueta respiratória? ", content: "As medidas de higiene e etiqueta respiratória têm como objetivo reduzir a exposição e transmissão da doença e são: tapar o nariz e a boca quando espirrar ou tossir, com um lenço de papel ou com o antebraço, nunca com as mãos, e deitar sempre o lenço de papel no lixo; Lavar as mãos frequentemente. Deve lavá-las sempre que se assoar, espirrar, tossir ou após contacto direto com pessoas doentes. Deve lavá-las durante 20 segundos (o tempo que demora a cantar os “Parabéns”) com água e sabão ou com solução à base de álcool a 70%; Evitar contacto próximo com pessoas com infeção respiratória; Evitar tocar na cara com as mãos; Evitar partilhar objetos pessoais ou comida em que tenha tocado." },
            { type: "PREVENCAO", title: "Quem está em risco de doença por COVID-19?", content: "O vírus não tem nacionalidade, idade ou género, por isso todos corremos o risco de contrair a COVID-19. Ainda assim, as pessoas que correm maior risco de doença grave por COVID-19 são os idosos e pessoas com doenças crónicas (ex.: doenças cardíacas e doenças pulmonares)." },
            { type: "PREVENCAO", title: "Quais são os grupos considerados de risco para o COVID-19?", content: "Pessoas idosas acima de 70 anos; Pessoas com doenças crónicas – doença cardíaca, pulmonar, neoplasias, entre outras; Pessoas com compromisso do sistema imunitário (a fazer tratamentos de quimioterapia, tratamentos para doenças auto-imunes (artrite reumatoide, lúpus, esclerose múltipla ou algumas doenças inflamatórias do intestino), infeção VIH/sida ou doentes transplantados." },
            { type: "PREVENCAO", title: "Os fumadores estão em maior risco de doença grave por COVID-19?", content: "Não existem estudos que confirmem esta questão. No entanto, se a pessoa fumadora já tiver problemas respiratórios ou cardíacos, isso pode contribuir para o agravamento da situação clínica da pessoa, caso se infete com COVID-19. Um fumador de longa data já apresenta alterações pulmonares que podem estar associados a quadros de pneumonia em caso de infeção por COVID-19." },
            { type: "PREVENCAO", title: "Um fumador que deixe os hábitos tabagísticos melhora a sua capacidade de resposta à infeção por COVID-19?", content: "A recuperação da capacidade pulmonar não é imediata. Mas qualquer pessoa que decide deixar de fumar deve fazê-lo porque fará sempre a diferença (cancro, AVC, enfarte agudo do miocárdio, DPOC e outras doenças crónicas) e terá sempre benefícios para a sua saúde – a curto e longo prazo." },
            { type: "PREVENCAO", title: "Que cuidados devo ter na preparação e confeção de alimentos?", content: "Lave muito bem as mãos antes e enquanto está a confecionar as refeições. Tenha o cuidado de lavar adequadamente os alimentos crus e cozinhar e empratar a comida a temperaturas adequadas. Não partilhe comida ou objetos entre pessoas durante a sua preparação, confeção e consumo. Em todos os momentos, adote as medidas de etiqueta respiratória. Evite a contaminação entre comida crua e cozinhada." },
            { type: "ISOLAMENTO", title: "Que cuidados devo ter se estiver em isolamento?", content: "Deve permanecer em casa. Não deve dirigir-se ao trabalho, à escola ou a espaços públicos. Permaneça numa divisão própria e evite contactar com outros em espaços comuns. Não partilhe pratos, copos, utensílios de cozinha, lençóis ou outros objetos pessoais. Quando estiver com outras pessoas, utilize máscara. Cumpra as recomendações de lavagem das mãos e de etiqueta respiratória. Monitorize os sintomas e coloque os seus resíduos num saco próprio. " },
            { type: "ISOLAMENTO", title: "O que devem ter em conta os outros membros da casa?", content: "Deve ser evitado o contacto com a pessoa com sintomas, especialmente se pertencer aos grupos vulneráveis: idosos, doentes crónicos, imunossuprimidos e grávidas. Preferencialmente, deve ser uma única pessoa a cuidar de quem está doente. Após o contacto com o paciente ou com o seu espaço, lave as mãos com sabão e água ou com uma solução à base e álcool. Desinfete com frequência torneiras, interruptores e maçanetas das portas, especialmente se a pessoa doente usar espaços comuns. " },
            { type: "ISOLAMENTO", title: "Se estiver em isolamento, posso receber pessoas em casa?", content: "Não. Apenas deve frequentar a habitação quem coabitar com a pessoa com COVID-19. Em caso de necessidade de contacto urgente com alguém que não coabite com a pessoa em isolamento, o contacto deve ser feito por telefone. " }
        ];
        let { navigator, currentPage } = this.props;

        return (
            <Page className="background indications-page-container"
                renderBottomToolbar={() => <NavBar
                    navigator={navigator}
                    currentPage={currentPage} />
                }
            >
                <Swipeable
                    style={{ width: "100%", height: "100%" }}
                    onSwipedRight={() => navigator.popPage()}>
                    <div className="page-container" >
                        <Title title="indicações" />

                        <div className="search-container">
                            <input
                                id="search-indications"
                                className="search-input"
                                type="text"
                                placeholder="O que procura?"
                                name="search"
                                onChange={() => this.handleSearch(placeholderItem)}>
                            </input>
                        </div>

                        <div className="indications-container">
                            <List
                                dataSource={placeholderItem}
                                renderRow={(element, idx) => (
                                    <ListItem modifier={'nodivider'} className="indication-listitem">
                                        <div className="indication" onClick={() => this.handleClick(idx)}>
                                            <div className="indication-title">
                                                {element.title}
                                            </div>
                                            <div className="indication-icon">
                                                <img src={DownArrowIcon} id={"icon-" + idx} />
                                            </div>
                                            <div className="indication-content" id={"content-" + idx}>
                                                {element.content}
                                            </div>
                                        </div>
                                    </ListItem>
                                )}
                            />
                        </div>
                    </div>
                </Swipeable>
            </Page>
        );
    }
}

export default Indications;