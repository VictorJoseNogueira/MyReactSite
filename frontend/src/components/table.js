function TableCreate({ name, area, cnpj, aulas, valor, autorizado, enviado, emitido }) {
    return (
      <table className="table">
        <tbody>
          <tr>
            <th>Nome</th>
            <td>{name}</td>
          </tr>
          <tr>
            <th>Grande Área</th>
            <td>{area}</td>
          </tr>
          <tr>
            <th>CNPJ</th>
            <td>{cnpj}</td>
          </tr>
          <tr>
            <th>Aulas</th>
            <td>{aulas}</td>
          </tr>
          <tr>
            <th>Valor</th>
            <td>{valor}</td>
          </tr>
          <tr>
            <th>Autorizado</th>
            <td>{autorizado}</td>
          </tr>
          <tr>
            <th>Enviado</th>
            <td>{enviado}</td>
          </tr>
          <tr>
            <th>Emitido</th>
            <td>{emitido}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  
  export default TableCreate;
  