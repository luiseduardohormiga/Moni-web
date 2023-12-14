import nodemailer from "nodemailer"

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const info = await transport.sendMail({
        from: '"Moni-Web - Comprueba tu cuenta" <cuentas@MoniWEB.com>',
        to: email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola:${nombre} Comprueba tu cuenta</p>
        <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:<p/>
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje </p>
        `,
      })
}

export const emailOlvidepassword = async (datos) => {
  const { email, nombre, token } = datos

  var transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // iformacion del email
    const info = await transport.sendMail({
      from: '"Moni-Web - Recupera tu contraseña" <cuentas@MoniWEB.com>',
      to: email,
      subject: "Moni-Web - Reestablese tu password",
      text: " Reestablese tu password de tu cuenta en Moni-Web",
      html: `<p>Hola:${nombre}  has solicitado reestableser tu password</p>
      <p>Dar click en el enlace para reestablecer tu password<p/>
      <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
      <p>Si tu no solicitaste esta accion, puedes ignorar el mensaje </p>
      `,
    });
}