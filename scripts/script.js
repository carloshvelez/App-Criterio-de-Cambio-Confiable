document.addEventListener('DOMContentLoaded', function (){

    let formulario = document.getElementById("formulario-icf")

    formulario.addEventListener('submit', function(event){
        event.preventDefault()

        let desviacion = parseFloat(formulario.elements.desviacionEstandar.value);
        let confiabilidad = parseFloat(formulario.elements.confiabilidad.value);
        let complementariaConfiabilidad = 1-confiabilidad;         
        let eem = desviacion * Math.sqrt(complementariaConfiabilidad);
        let eed = eem * Math.sqrt(2);
        eed = eed.toFixed(2)
        
        let seccionResultados = document.getElementById("resultados");
        seccionResultados.innerText = "";
        let textoResultados = document.createElement("p");
        textoResultados.innerHTML= `<p>El error estándar de la diferencia es <strong>${eed}</strong>. para que tus cambios sean confiables, deben ser 1.96 veces esa cifra; es decir, <strong>${(eed * 1.96).toFixed(2)}</strong>.</p><p>Lo anterior significa que para que la diferencia entre las medidas pre y post de tu usuario sea significativa, debe estar por encima de <strong>${(eed*1.96).toFixed(2)}</strong>.</p>
        <h3>Sobre el Índice de Cambio Confiable</h3> <p>Lo anterior NO es el índice de cambio confiable; sólo es un criterio que se calcula a partir del índice de cambio fiable. El ICF resulta de dividir la diferencia entre el pre y el post, y el error estándar de la diferencia (en tu caso, ${eed}). Por ejemplo, Si tu consultante obtuvo un puntaje de 20 en el pre, y 30 en el post, esto quiere decir que la diferencia fue de 10. El índice de cambio confiable resultaría de dividir 10 entre ${eed}:</p><p><strong> ICF = (MedidaPost - MedidaPre)/ErrorEstandardelaDiferencia</strong> </p><p><strong> ICF = 10/${eed} = ${(10/eed).toFixed(2)}</strong> </p>
        
`        
        
        
        seccionResultados.append(textoResultados)

    })






})