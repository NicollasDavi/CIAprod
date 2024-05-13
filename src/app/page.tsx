import Image from "next/image";

import styles from "../app/css/login.module.css"

export default function Home() {

  return (
    <main className={styles.main}>
      <div className={styles.div1}>
        <div>
          <div>
            <h1 className={styles.textoCiaD}>Bem vindo de volta ao CIA!</h1>
            <h1 className={styles.textoCia}>Bem vindo de volta!</h1>

            <h2 className={styles.info}>Essa é a nossa Central de Informações para Atendimento.</h2>
          </div>
          <div>
            <section >
              <input type="text" placeholder="Matrícla" className={styles.input} />
            </section>
            <section>
              <input type="text" placeholder="Senha" className={styles.input} />
            </section>
            <p style={{textAlign: "start", marginTop: "1rem", fontSize: "0.75rem", lineHeight: "1rem", marginLeft: "0.5rem"}}>Esqueceu a senha ?</p>
          </div>
          <div className="md:mt-20 mt-4">
            <button className={styles.button}>Entrar</button>
            <p style={{fontSize: "0.75rem", lineHeight: "1rem", marginTop: "1rem"}}>Primeiro Acesso?</p>
          </div>
        </div>
      </div>
      <div className="w-screen md:w-6/12 text-center md:mr-10">
        <div>
            <div style={{width: "100%", padding: "0 0.5rem 0 0.5rem"}}>
              <Image alt="" src="/Branco.png" width={1000} height={1000} className={styles.image_container}/>
            </div>
            <div className={styles.textInfo}>
              <h1 style={{fontWeight: "bolder", fontSize: "2.5rem", lineHeight: "2.5rem"}}>CIA</h1>
              <h1 style={{fontWeight: "bolder", fontSize: "2.5rem", lineHeight: "2.5rem", marginTop: "0.5rem"}}>Curso Positivo</h1>
              <p  style={{width: "83.333333%", margin: "auto", marginTop: "3rem"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam maecenas mi non sed ut odio. Non, justo, sed facilisi et. Eget viverra urna, vestibulum egestas faucibus egestas. Sagittis nam velit volutpat eu nunc.</p>
            </div>
        </div>
      </div>
    </main> 

  );
}


