const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendOrderInDeliveryEmail = async (order, user) => {
    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;
    const frontendUrl = process.env.FRONTEND_URL || 'https://casa-steph-iberico.vercel.app';
    const invoiceUrl = `${frontendUrl}/account/orders/${order.id}`;

    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (typeof items === 'string') items = JSON.parse(items);
    } catch (_) { items = []; }

    const itemsHtml = items.length > 0 ? items.map(item => `
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: center; color: #666;">×${item.quantity}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; color: #1a1714;">${(item.price * item.quantity).toFixed(2)} €</td>
        </tr>
    `).join('') : '';

    const deliveryBlock = order.deliveryDate && order.deliveryTimeSlot
        ? `<div style="background-color: #f0f7f0; border-left: 4px solid #4caf50; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>📅 Date de livraison :</strong> ${order.deliveryDate}</p>
            <p style="margin: 0 0 6px 0; font-size: 14px;"><strong>🕐 Créneau :</strong> ${order.deliveryTimeSlot}</p>
            <p style="margin: 0; font-size: 14px;"><strong>📍 Adresse :</strong> ${order.deliveryAddress}, ${order.postalCode}</p>
          </div>`
        : `<div style="background-color: #f0f7f0; border-left: 4px solid #4caf50; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 14px;"><strong>📍 Adresse de livraison :</strong> ${order.deliveryAddress}, ${order.postalCode}</p>
          </div>`;

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: `Votre commande est en route (${orderNumber})`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <div style="background-color: #1a1714; padding: 32px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 26px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 6px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">

          <h2 style="color: #1a1714; margin-top: 0;">
            Votre commande est en livraison, ${user.firstName ? user.firstName : ''} !
          </h2>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            Bonne nouvelle ! Votre commande <strong>${orderNumber}</strong> a été soigneusement préparée et
            est maintenant en route vers chez vous.
          </p>

          ${deliveryBlock}

          <h3 style="color: #1a1714; border-bottom: 2px solid #C9A66B; padding-bottom: 8px; font-size: 15px;">Récapitulatif</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <th style="text-align: left; padding-bottom: 8px;">Produit</th>
                <th style="text-align: center; padding-bottom: 8px;">Qté</th>
                <th style="text-align: right; padding-bottom: 8px;">Prix</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <table style="width: 100%; margin-top: 10px; font-size: 14px;">
            ${order.deliveryFee > 0
                ? `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #666;">${Number(order.deliveryFee).toFixed(2)} €</td></tr>`
                : `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #2e7d32; font-weight: 600;">Gratuite</td></tr>`
            }
            <tr>
              <td style="padding: 10px 0 0 0; font-size: 17px; font-weight: bold; color: #1a1714;">Total</td>
              <td style="text-align: right; padding-top: 10px; font-size: 17px; font-weight: bold; color: #C9A66B;">${order.total.toFixed(2)} €</td>
            </tr>
          </table>

          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${invoiceUrl}"
               style="background-color: #C9A66B; color: #1a1714; padding: 16px 44px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Télécharger ma facture
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Des questions sur votre livraison ? Contactez-nous par WhatsApp au <strong>+33 6 89 66 91 15</strong>
            ou par email à <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>

          <p style="margin-top: 30px; color: #444; font-size: 14px;">
            À très bientôt,<br>
            <strong>L'équipe Casa Steph Iberico</strong>
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B; text-decoration: none;">casastephmetz@gmail.com</a>
          </p>
        </div>

      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ In-delivery email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ In-delivery email failed:', error);
        return { success: false, error };
    }
};

const sendOrderDeliveredEmail = async (order, user) => {
    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;
    const frontendUrl = process.env.FRONTEND_URL || 'https://casa-steph-iberico.vercel.app';
    const invoiceUrl = `${frontendUrl}/account/orders/${order.id}`;

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: `Commande livrée, merci pour votre confiance !`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <div style="background-color: #1a1714; padding: 32px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 26px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 6px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">

          <h2 style="color: #1a1714; margin-top: 0;">
            Commande livrée, merci ${user.firstName ? user.firstName : ''} !
          </h2>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            Votre commande <strong>${orderNumber}</strong> a bien été livrée.
            Nous espérons que vous régalez avec nos produits ibériques !
          </p>

          <div style="background-color: #f9f6f2; border-left: 4px solid #C9A66B; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0; font-size: 14px; color: #444; line-height: 1.7;">
              Si quelque chose ne correspond pas à vos attentes, ou si vous avez la moindre question
              sur votre commande, n'hésitez pas à nous contacter directement : nous sommes là pour vous.
            </p>
          </div>

          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${invoiceUrl}"
               style="background-color: #C9A66B; color: #1a1714; padding: 16px 44px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Télécharger ma facture
            </a>
          </div>

          <p style="color: #666; font-size: 14px; text-align: center;">
            Par WhatsApp : <strong>+33 6 89 66 91 15</strong><br>
            Par email : <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>
          </p>

          <p style="margin-top: 35px; color: #444; font-size: 15px; line-height: 1.6;">
            Nous espérons vous retrouver très bientôt chez Casa Steph Iberico.<br><br>
            <strong>L'équipe Casa Steph Iberico</strong>
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B; text-decoration: none;">casastephmetz@gmail.com</a>
          </p>
        </div>

      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Delivered email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Delivered email failed:', error);
        return { success: false, error };
    }
};

const sendPasswordResetEmail = async (user, resetLink) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A66B;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour${user.firstName ? ' ' + user.firstName : ''},</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Ce lien est valable <strong>1 heure</strong>.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}"
             style="background-color: #C9A66B; color: #1a1714; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px;">
            Réinitialiser mon mot de passe
          </a>
        </div>
        <p style="color: #888; font-size: 13px;">Si vous n'avez pas fait cette demande, ignorez cet email. Votre mot de passe ne sera pas modifié.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="font-size: 12px; color: #666;">Casa Steph Iberico · casastephmetz@gmail.com</p>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Reset email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Reset email failed:', error);
        return { success: false, error };
    }
};

const sendOrderConfirmationEmail = async (order, user) => {
    const items = JSON.parse(order.items);
    const itemsHtml = items.map(item => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${item.name}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #eee; text-align: right;">${(item.price * item.quantity).toFixed(2)} €</td>
        </tr>
    `).join('');

    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;
    const paymentLabel = order.paymentMethod === 'cash'
        ? 'Espèces à la livraison'
        : 'Lien de paiement sécurisé';

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: `Confirmation de commande ${orderNumber}`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1714; padding: 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 24px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 5px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">
          <h2 style="color: #1a1714;">Merci pour votre commande${user.firstName ? ', ' + user.firstName : ''} !</h2>
          <p>Votre commande <strong>${orderNumber}</strong> a bien été reçue. Nous la préparons dès que possible.</p>

          <div style="background-color: #f9f6f2; border-left: 4px solid #C9A66B; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 6px 0;"><strong>📍 Adresse de livraison :</strong> ${order.deliveryAddress}, ${order.postalCode}</p>
            <p style="margin: 0 0 6px 0;"><strong>💳 Paiement :</strong> ${paymentLabel}</p>
            <p style="margin: 0;"><strong>📋 Statut :</strong> En attente de préparation</p>
          </div>

          <h3 style="color: #1a1714; border-bottom: 2px solid #C9A66B; padding-bottom: 8px;">Détail de la commande</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="color: #888; font-size: 13px;">
                <th style="text-align: left; padding-bottom: 8px;">Produit</th>
                <th style="text-align: center; padding-bottom: 8px;">Qté</th>
                <th style="text-align: right; padding-bottom: 8px;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>

          <table style="width: 100%; margin-top: 15px;">
            ${order.deliveryFee > 0 ? `
            <tr>
              <td style="padding: 4px 0; color: #666;">Livraison</td>
              <td style="text-align: right; color: #666;">${order.deliveryFee.toFixed(2)} €</td>
            </tr>` : `
            <tr>
              <td style="padding: 4px 0; color: #666;">Livraison</td>
              <td style="text-align: right; color: #2e7d32;">Gratuite</td>
            </tr>`}
            <tr>
              <td style="padding: 8px 0; font-size: 18px; font-weight: bold;">Total</td>
              <td style="text-align: right; font-size: 18px; font-weight: bold; color: #C9A66B;">${order.total.toFixed(2)} €</td>
            </tr>
          </table>

          <p style="margin-top: 30px; color: #666; font-size: 14px;">
            Des questions ? Contactez-nous par WhatsApp au <strong>+33 6 89 66 91 15</strong> ou par email à <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="color: #C9A66B; text-decoration: none;">casasteph.fr</a>
          </p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Order confirmation sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Order confirmation email failed:', error);
        return { success: false, error };
    }
};

const sendWelcomeEmail = async (user) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: 'Bienvenue chez Casa Steph Iberico !',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #1a1714; padding: 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 24px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 5px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">
          <h2 style="color: #1a1714;">Bienvenue${user.firstName ? ' ' + user.firstName : ''} !</h2>

          <p>Votre compte a été créé avec succès. Vous pouvez dès maintenant parcourir notre boutique et passer commande.</p>

          <div style="background-color: #f9f6f2; border-left: 4px solid #C9A66B; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 8px 0;"><strong>Votre email :</strong> ${user.email}</p>
            <p style="margin: 0; color: #666; font-size: 13px;">Conservez ces informations pour vous connecter.</p>
          </div>

          <div style="text-align: center; margin: 35px 0;">
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/boutique"
               style="background-color: #C9A66B; color: #1a1714; padding: 14px 36px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px;">
              Découvrir la boutique
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Des questions ? Contactez-nous par WhatsApp au <strong>+33 6 89 66 91 15</strong> ou par email à <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}" style="color: #C9A66B; text-decoration: none;">casasteph.fr</a>
          </p>
        </div>
      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Welcome email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Welcome email failed:', error);
        return { success: false, error };
    }
};

const sendPaymentLinkEmail = async (order, user, sumupLink) => {
    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;

    const orderDate = new Date(order.createdAt);
    const orderDateFr = orderDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
    const orderTimeFr = orderDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (typeof items === 'string') items = JSON.parse(items);
    } catch (_) { items = []; }

    const itemsHtml = items.length > 0 ? items.map(item => `
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: center; color: #666;">×${item.quantity}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; color: #1a1714;">${(item.price * item.quantity).toFixed(2)} €</td>
        </tr>
    `).join('') : `<tr><td colspan="3" style="padding: 10px 0; color: #999; font-style: italic;">Détail non disponible</td></tr>`;

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: `Votre lien de paiement sécurisé (${orderNumber})`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <!-- Header -->
        <div style="background-color: #1a1714; padding: 32px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 26px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 6px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px;">

          <h2 style="color: #1a1714; margin-top: 0;">
            Bonjour ${user.firstName ? user.firstName : ''}, votre lien de paiement est disponible !
          </h2>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            Nous vous remercions pour votre commande passée le <strong>${orderDateFr} à ${orderTimeFr}</strong>.
            Voici votre lien de paiement sécurisé pour finaliser votre achat.
          </p>

          <!-- Order info -->
          <div style="background-color: #f9f6f2; border-left: 4px solid #C9A66B; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>📋 Référence :</strong> ${orderNumber}</p>
            <p style="margin: 0; font-size: 14px;"><strong>💰 Montant à régler :</strong> <span style="color: #C9A66B; font-size: 16px; font-weight: bold;">${order.total.toFixed(2)} €</span></p>
          </div>

          <!-- Items recap -->
          <h3 style="color: #1a1714; border-bottom: 2px solid #C9A66B; padding-bottom: 8px; font-size: 15px;">Récapitulatif de votre commande</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <th style="text-align: left; padding-bottom: 8px;">Produit</th>
                <th style="text-align: center; padding-bottom: 8px;">Qté</th>
                <th style="text-align: right; padding-bottom: 8px;">Prix</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <table style="width: 100%; margin-top: 10px; font-size: 14px;">
            ${order.deliveryFee > 0
                ? `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #666;">${Number(order.deliveryFee).toFixed(2)} €</td></tr>`
                : `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #2e7d32; font-weight: 600;">Gratuite</td></tr>`
            }
            <tr>
              <td style="padding: 10px 0 0 0; font-size: 17px; font-weight: bold; color: #1a1714;">Total</td>
              <td style="text-align: right; padding-top: 10px; font-size: 17px; font-weight: bold; color: #C9A66B;">${order.total.toFixed(2)} €</td>
            </tr>
          </table>

          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${sumupLink}"
               style="background-color: #C9A66B; color: #1a1714; padding: 16px 44px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Régler ma commande (${order.total.toFixed(2)} €)
            </a>
          </div>

          <p style="color: #888; font-size: 12px; text-align: center; margin-bottom: 30px;">
            Lien sécurisé via SumUp. Si le bouton ne s'ouvre pas, copiez ce lien dans votre navigateur :<br>
            <a href="${sumupLink}" style="color: #C9A66B; word-break: break-all; font-size: 12px;">${sumupLink}</a>
          </p>

          <!-- Next steps -->
          <div style="background-color: #f0f7f0; border-left: 4px solid #4caf50; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #2e7d32; font-size: 14px;">Prochaines étapes</p>
            <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.7;">
              Dès réception de votre paiement, nous procéderons à la <strong>préparation de votre commande</strong>.<br>
              Vous serez tenu informé par email à chaque étape : préparation, prêt à livrer, et livraison.
            </p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Des questions ? Contactez-nous par WhatsApp au <strong>+33 6 89 66 91 15</strong> ou par email à
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>

          <p style="margin-top: 30px; color: #444; font-size: 14px;">
            À très bientôt,<br>
            <strong>L'équipe Casa Steph Iberico</strong>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B; text-decoration: none;">casastephmetz@gmail.com</a>
          </p>
        </div>

      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Payment link email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Payment link email failed:', error);
        return { success: false, error };
    }
};

const sendVerificationEmail = async (user, verificationLink) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: 'Activez votre compte Casa Steph Iberico',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <div style="background-color: #1a1714; padding: 32px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 26px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 6px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">

          <h2 style="color: #1a1714; margin-top: 0;">
            Bienvenue${user.firstName ? ' ' + user.firstName : ''}, plus qu'une étape !
          </h2>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            Merci de vous être inscrit(e) sur notre boutique en ligne. Pour activer votre compte
            et commencer à commander, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
          </p>

          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${verificationLink}"
               style="background-color: #C9A66B; color: #1a1714; padding: 16px 44px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Confirmer mon adresse email
            </a>
          </div>

          <p style="color: #888; font-size: 12px; text-align: center; margin-bottom: 30px;">
            Ce lien est valable <strong>24 heures</strong>. Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br>
            <a href="${verificationLink}" style="color: #C9A66B; word-break: break-all; font-size: 11px;">${verificationLink}</a>
          </p>

          <div style="background-color: #fff8e7; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 13px; color: #92400e;">
              Si vous n'avez pas créé de compte sur notre boutique, ignorez simplement cet email.
            </p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Des questions ? Contactez-nous à
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>

          <p style="margin-top: 30px; color: #444; font-size: 14px;">
            À très bientôt,<br>
            <strong>L'équipe Casa Steph Iberico</strong>
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B; text-decoration: none;">casastephmetz@gmail.com</a>
          </p>
        </div>

      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Verification email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Verification email failed:', error);
        return { success: false, error };
    }
};

const sendPaymentConfirmedEmail = async (order, user) => {
    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;
    const frontendUrl = process.env.FRONTEND_URL || 'https://casa-steph-iberico.vercel.app';
    const invoiceUrl = `${frontendUrl}/account/orders/${order.id}`;

    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (typeof items === 'string') items = JSON.parse(items);
    } catch (_) { items = []; }

    const itemsHtml = items.length > 0 ? items.map(item => `
        <tr>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: center; color: #666;">×${item.quantity}</td>
          <td style="padding: 9px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600; color: #1a1714;">${(item.price * item.quantity).toFixed(2)} €</td>
        </tr>
    `).join('') : `<tr><td colspan="3" style="padding: 10px 0; color: #999; font-style: italic;">Détail non disponible</td></tr>`;

    const deliveryRow = order.deliveryFee > 0
        ? `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #666;">${Number(order.deliveryFee).toFixed(2)} €</td></tr>`
        : `<tr><td style="padding: 4px 0; color: #666;">Livraison</td><td style="text-align: right; color: #2e7d32; font-weight: 600;">Gratuite</td></tr>`;

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: user.email,
        subject: `Paiement confirmé pour votre commande ${orderNumber} ✓`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <div style="background-color: #1a1714; padding: 32px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 26px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #888; margin: 6px 0 0 0; font-size: 13px;">Charcuterie & fromages ibériques · Metz</p>
        </div>

        <div style="padding: 40px 30px;">

          <h2 style="color: #1a1714; margin-top: 0;">
            Paiement confirmé, merci ${user.firstName ? user.firstName : ''}&nbsp;!
          </h2>

          <p style="color: #444; font-size: 15px; line-height: 1.6;">
            Nous avons bien reçu votre paiement pour la commande <strong>${orderNumber}</strong>.
            Votre commande est maintenant en cours de préparation.
          </p>

          <div style="background-color: #f9f6f2; border-left: 4px solid #C9A66B; padding: 18px 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
            <p style="margin: 0 0 5px 0; font-size: 14px;"><strong>📋 Référence :</strong> ${orderNumber}</p>
            <p style="margin: 0; font-size: 14px;"><strong>💰 Montant réglé :</strong> <span style="color: #C9A66B; font-size: 16px; font-weight: bold;">${order.total.toFixed(2)} €</span></p>
          </div>

          <h3 style="color: #1a1714; border-bottom: 2px solid #C9A66B; padding-bottom: 8px; font-size: 15px;">Récapitulatif de votre commande</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <thead>
              <tr style="color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
                <th style="text-align: left; padding-bottom: 8px;">Produit</th>
                <th style="text-align: center; padding-bottom: 8px;">Qté</th>
                <th style="text-align: right; padding-bottom: 8px;">Prix</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <table style="width: 100%; margin-top: 10px; font-size: 14px;">
            ${deliveryRow}
            <tr>
              <td style="padding: 10px 0 0 0; font-size: 17px; font-weight: bold; color: #1a1714;">Total payé</td>
              <td style="text-align: right; padding-top: 10px; font-size: 17px; font-weight: bold; color: #C9A66B;">${order.total.toFixed(2)} €</td>
            </tr>
          </table>

          <div style="text-align: center; margin: 40px 0 30px 0;">
            <a href="${invoiceUrl}"
               style="background-color: #C9A66B; color: #1a1714; padding: 16px 44px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">
              Télécharger ma facture
            </a>
          </div>

          <div style="background-color: #f0f7f0; border-left: 4px solid #4caf50; padding: 18px 20px; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #2e7d32; font-size: 14px;">Prochaines étapes</p>
            <p style="margin: 0; color: #444; font-size: 14px; line-height: 1.7;">
              Nous préparons votre commande avec soin. Vous recevrez un email dès qu'elle sera <strong>prête pour la livraison</strong>.
            </p>
          </div>

          <p style="color: #666; font-size: 14px;">
            Des questions ? Contactez-nous par WhatsApp au <strong>+33 6 89 66 91 15</strong> ou par email à
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B;">casastephmetz@gmail.com</a>.
          </p>

          <p style="margin-top: 30px; color: #444; font-size: 14px;">
            À très bientôt,<br>
            <strong>L'équipe Casa Steph Iberico</strong>
          </p>
        </div>

        <div style="background-color: #f5f5f5; padding: 20px 30px; text-align: center;">
          <p style="margin: 0; font-size: 12px; color: #999;">
            Casa Steph Iberico, Metz, France<br>
            <a href="mailto:casastephmetz@gmail.com" style="color: #C9A66B; text-decoration: none;">casastephmetz@gmail.com</a>
          </p>
        </div>

      </div>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Payment confirmed email sent to ${user.email}`);
        return { success: true };
    } catch (error) {
        console.error('❌ Payment confirmed email failed:', error);
        return { success: false, error };
    }
};

const sendAdminNewOrderEmail = async (order, customer) => {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
    if (!adminEmail) return;

    const orderNumber = `AE-${order.id.toString().padStart(6, '0')}`;
    const backendUrl = process.env.FRONTEND_URL || 'https://casa-steph-iberico.vercel.app';
    const adminOrdersUrl = `${backendUrl}/admin/orders`;

    let items = [];
    try {
        items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        if (typeof items === 'string') items = JSON.parse(items);
    } catch (_) { items = []; }

    const itemsHtml = items.map(item => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${item.name}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: center; color: #666;">×${item.quantity}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right; font-weight: 600;">${(item.price * item.quantity).toFixed(2)} €</td>
        </tr>
    `).join('');

    const contactLabel = order.contactPreference === 'whatsapp' ? 'WhatsApp' : 'Email';

    const mailOptions = {
        from: process.env.SMTP_FROM || '"Casa Steph Iberico" <casastephmetz@gmail.com>',
        to: adminEmail,
        subject: `🛒 Nouvelle commande ${orderNumber} (${order.total.toFixed(2)} €)`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">

        <div style="background-color: #1a1714; padding: 28px 30px; text-align: center;">
          <h1 style="color: #C9A66B; margin: 0; font-size: 22px; letter-spacing: 1px;">Casa Steph Iberico</h1>
          <p style="color: #aaa; margin: 8px 0 0; font-size: 13px;">Nouvelle commande reçue</p>
        </div>

        <div style="padding: 30px;">

          <div style="background-color: #fff8ee; border-left: 4px solid #C9A66B; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1a1714;">Commande ${orderNumber}</p>
            <p style="margin: 6px 0 0; color: #666; font-size: 13px;">Total : <strong style="color: #1a1714;">${order.total.toFixed(2)} €</strong></p>
          </div>

          <h3 style="color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Client</h3>
          <table style="width: 100%; margin-bottom: 24px;">
            <tr><td style="padding: 4px 0; color: #666; font-size: 14px; width: 140px;">Nom</td><td style="font-size: 14px; color: #333;">${customer.firstName || ''} ${customer.lastName || ''}</td></tr>
            <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Email</td><td style="font-size: 14px; color: #333;">${customer.email}</td></tr>
            <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Téléphone</td><td style="font-size: 14px; color: #333;">${order.phone}</td></tr>
            <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Adresse</td><td style="font-size: 14px; color: #333;">${order.deliveryAddress}, ${order.postalCode}</td></tr>
            <tr><td style="padding: 4px 0; color: #666; font-size: 14px;">Contact préféré</td><td style="font-size: 14px; color: #333; font-weight: bold;">${contactLabel}</td></tr>
          </table>

          <h3 style="color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Articles commandés</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
            ${itemsHtml}
            <tr>
              <td colspan="2" style="padding: 12px 0 4px; font-weight: bold; color: #333;">Total</td>
              <td style="padding: 12px 0 4px; text-align: right; font-weight: bold; font-size: 16px; color: #1a1714;">${order.total.toFixed(2)} €</td>
            </tr>
          </table>

          ${order.notes ? `<div style="background-color: #f9f9f9; padding: 12px 16px; border-radius: 6px; margin-bottom: 24px;"><p style="margin: 0; font-size: 13px; color: #666;">Note : ${order.notes}</p></div>` : ''}

          <div style="text-align: center; margin-top: 28px;">
            <a href="${adminOrdersUrl}" style="display: inline-block; background-color: #C9A66B; color: #1a1714; padding: 13px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; letter-spacing: 0.5px;">
              Gérer la commande
            </a>
          </div>

        </div>

        <div style="background-color: #f5f5f5; padding: 16px; text-align: center; border-top: 1px solid #eee;">
          <p style="margin: 0; color: #999; font-size: 12px;">Casa Steph Iberico · Administration</p>
        </div>

      </div>`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('❌ Admin new order email failed:', error);
    }
};

module.exports = {
    sendOrderInDeliveryEmail,
    sendOrderDeliveredEmail,
    sendPasswordResetEmail,
    sendWelcomeEmail,
    sendOrderConfirmationEmail,
    sendPaymentLinkEmail,
    sendPaymentConfirmedEmail,
    sendVerificationEmail,
    sendAdminNewOrderEmail,
};