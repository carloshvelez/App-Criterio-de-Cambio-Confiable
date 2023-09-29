document.addEventListener('DOMContentLoaded', function (){

    let formulario = document.getElementById("formulario-dif")
    let formularioIcf = document.getElementById("formulario-icf")

    if (formulario){
        formulario.addEventListener('submit', function(event){
            event.preventDefault()
            let desviacion = parseFloat(formulario.elements.desviacionEstandar.value);
            let confiabilidad = parseFloat(formulario.elements.confiabilidad.value);  

            let error = document.createElement("div");  
            

            if (confiabilidad >= 1 | confiabilidad <= 0 ){      
                alert("La confiabilidad debe ser una valor mayor que 0 y menor que 1")                         
                return null
            }   
            
            if (confiabilidad > 0 && confiabilidad < 0.50){
                alert("La confiabilidad de su instrumento es muy baja; probablemente no debería utilizarlo. El cálculo se realizará pero debe tener cuidado a la hora de interpretar el resultado")                                         
            }

            let eed = calcularDiferenciaConfiable(desviacion, confiabilidad)
            
            let seccionResultados = document.getElementById("resultados");
            seccionResultados.innerText = "";
            let textoResultados = document.createElement("div");
            textoResultados.innerHTML= `<p class="pSinEspacio"><strong>EED = ${eed}</strong></p>
            <p><strong>Cambio fiable a partir de: &plusmn${(eed*1.96).toFixed(2)}</strong></p>
            <p>El error estándar de la diferencia EED) es <strong>${eed}</strong>. Para que el cambio sea confiable, debe ser al menos &plusmn1.96 veces esa cifra; es decir,  <strong>&plusmn${(eed * 1.96).toFixed(2)}</strong>.</p><p>Lo anterior significa que para que la diferencia entre postest y pretest sea confiable, debe superar a <strong>&plusmn${(eed*1.96).toFixed(2)}</strong>.</p> 
            <p class="alert alert-info">Cuando decimos que x supera a &plusmn${(eed*1.96).toFixed(2)}, nos referimos a que x puede estar por encima de +${(eed*1.96).toFixed(2)} o por debajo de -${(eed*1.96).toFixed(2)}.</p>
            <h3>Sobre el Índice de Cambio Confiable</h3> <p>El cálculo anterior te permite identificar a partir de qué punto la diferencia que observas es confiable; sin embargo, NO es el Índice de Cambio Fiable. Si quieres calcular el ICF de cada individuo tendrás que ingresar las medidas en pretest y postest en <a href="/icf.html">esta calculadora</a></p>
            `
            seccionResultados.append(textoResultados)
        })
    }


    if (formularioIcf){
        formularioIcf.addEventListener('submit', function(event){
            event.preventDefault()
            let desviacion = parseFloat(formularioIcf.elements.desviacionEstandar.value);
            let confiabilidad = parseFloat(formularioIcf.elements.confiabilidad.value);

            if (confiabilidad >= 1 | confiabilidad <= 0 ){      
                alert("La confiabilidad debe ser una valor mayor que 0 y menor que 1")                         
                return null
            }   
            
            if (confiabilidad > 0 && confiabilidad < 0.50){
                alert("La confiabilidad de su instrumento es muy baja; probablemente no debería utilizarlo. El cálculo se realizará pero debe tener cuidado a la hora de interpretar el resultado")                                         
            }
            let pre = parseFloat(formularioIcf.elements.pre.value);
            let post = parseFloat(formularioIcf.elements.post.value);        
            let eed = calcularDiferenciaConfiable(desviacion, confiabilidad);
            let icf = ((post-pre)/eed).toFixed(2);
            
            let fiable = icf > 1.96 | icf < -1.96 ? "fiable" : "NO fiable";
            let supera = icf > 1.96 | icf < -1.96 ? "supera" : "NO supera"; 
            let esMayor = icf > 1.96 | icf < -1.96 ? "mayor que" : "menor que";                        
            
            let seccionResultados = document.getElementById("resultados");
            seccionResultados.innerText = "";
            let textoResultados = document.createElement("div");
            textoResultados.innerHTML= `<p class="pSinEspacio"><strong>EED = ${eed}</strong></p>
            <p><strong>ICF = ${icf} (La diferencia es ${fiable})</strong></p>
            <p>El error estándar de la diferencia (EED) es <strong>${eed}</strong>. Para que el cambio sea confiable, la diferencia debe ser &plusmn1.96 veces esa cifra; es decir, <strong>&plusmn${(eed * 1.96).toFixed(2)}.</strong></p>
            <p> La diferencia entre el postest (<strong>${post}</strong>) y el pretest (<strong>${pre}</strong>) es de <strong>${post-pre}</strong>, lo cual  <strong> ${supera} a &plusmn${(eed*1.96).toFixed(2)}</strong>, así que la diferencia es <strong>${fiable}.</strong> </p>
             <p>Lo anterior es equivalente a decir que el ICF, que fue de <strong>${icf},  ${supera} a &plusmn1.96</strong>, y por lo tanto se considera que la diferencia es <strong>${fiable}</strong>.</p>
             <p class="alert alert-info">Cuando decimos que x supera a &plusmn${(eed*1.96).toFixed(2)}, nos referimos a que x puede estar por encima de +${(eed*1.96).toFixed(2)} o por debajo de -${(eed*1.96).toFixed(2)}.</p>
            `
            seccionResultados.append(textoResultados)
        })
    }
    
})

function calcularDiferenciaConfiable(desviacion, confiabilidad){
    let complementariaConfiabilidad = 1-confiabilidad;         
        let eem = desviacion * Math.sqrt(complementariaConfiabilidad);
        let eed = eem * Math.sqrt(2);        
        return eed.toFixed(2)     
        

    }