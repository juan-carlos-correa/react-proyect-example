/*
* Inicia el servidor de la aplicacion. Hace el render (genera el html) que se envia al navegador.
**/

import http from 'http';
import React from 'react';
// React-dom tiene metodos para usar react en el servidor. Renderiza la aplicacion a un string en htlm
import { renderToString } from 'react-dom/server';

function requestHandler(req, res) {
  const html = renderToString(
    React.DOM.h1(null, 'hola')
  );
  res.write(html);
  res.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
