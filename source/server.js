/*
* Inicia el servidor de la aplicacion. Hace el render (genera el html) que se envia al navegador.
**/
import http from 'http'
import React from 'react'
// React-dom tiene metodos para usar react en el servidor. Renderiza la aplicacion a un string en htlm
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Pages from './pages/containers/Pages.jsx'

import Layout from './pages/components/Layout.jsx'

function requestHandler(req, res) {
  const context = {};
  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Pages/>
    </StaticRouter>
  );

  res.setHeader('Content-Type', 'text/html')

  if (context.url) {
  	res.writeHead(301, {
  		Location: context.url,
  	});
  	res.end();
  }
  res.write(
    renderToStaticMarkup(
      <Layout
        title="Aplication"
        content={html}
      />
    )
  )
  res.end()
  console.log('Server in port 3000')

}

const server = http.createServer(requestHandler);

server.listen(3000);
