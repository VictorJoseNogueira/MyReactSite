import React from "react";
import { formatCNPJ } from "../utils/formatCNPJ";

const CNPJFormatado = ({ cnpj }) => <span>{formatCNPJ(cnpj)}</span>;

export default CNPJFormatado;
