<?php



function mail_reservation($type_sejour) {
    $subject = "Nouvelle réservation - Hameau des Champs";

    $message = '
    <html>
    <head>
      <title>Nouvelle réservation</title>
    </head>
    <body>

      <img src="https://hameaudeschamps.fr/img/banniere.png" alt="Logo Hameau des Champs" style="width: 100%;">
      <h1>Bonjour,</h1>
      <p>Vous avez une nouvelle réservation pour un séjour <strong>' . htmlspecialchars($type_sejour) . '</strong>.</p>

        <p>Veuillez vous connecter à l\'administration pour plus de détails : <a href="https://hameaudeschamps.fr/admin.php">hameaudeschamps.fr/admin.php</a></p>
        
        
        
        <p>Merci de votre confiance.</p>
      <p>Cordialement,<br>L\'équipe Hameau des Champs</p>
    </body>
    </html>
    ';

  

    return mail_global( $subject, $message);
}
?>

<?php


function mail_message($msg,$nom,$mail,$tel) {
    $subject = "Message Contact - Hameau des Champs";
    $message = '
    <html>
    <head>
      <title>Message Contact - Hameau des Champs</title>
    </head>
    <body>
        <img src="https://hameaudeschamps.fr/img/banniere.png" alt="Logo Hameau des Champs" style="width: 100%;">
        <h1>Bonjour,</h1>
        <p>Vous avez reçu un message<strong></strong>.</p>
        <p>Voici les détails du message :</p>
        <p><strong>Nom :</strong> ' . htmlspecialchars($nom) . '</p>
        <p><strong>Email :</strong> ' . htmlspecialchars($mail) . '</p>
        <p><strong>Téléphone :</strong> ' . htmlspecialchars($tel) . '</p>
        <p><strong>Message :</strong><br>' . nl2br(htmlspecialchars($msg)) . '</p>
            <p>Merci de votre confiance.</p>
        <p>Cordialement,<br>L\'équipe Hameau des Champs</p>
    </body>
    </html>
    ';

    return mail_global( $subject, $message);
}




function avis_clients(){
    $subject = "Nouvel Avis - Hameau des Champs";
    $message = '
    <html>
    <head>
      <title>Nouvel Avis - Hameau des Champs</title>
    </head>
    <body>
        <img src="https://hameaudeschamps.fr/img/banniere.png" alt="Logo Hameau des Champs" style="width: 100%;">
        <h1>Bonjour,</h1>
        <p>Vous avez reçu un nouvel avis sur votre site<strong></strong>.</p>
            <p>Merci de votre confiance.</p>
        <p>Cordialement,<br>L\'équipe Hameau des Champs</p>
    </body>
    </html>
    ';
    return mail_global($subject, $message);

}


function mail_global($sujet,$message_mail){
    $to = "acrosaujeuvideo@gmail.com";
    $subject = $sujet;
    $message = $message_mail;

    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: noreply@hameaudeschamps.fr" . "\r\n";
    $headers .= "Reply-To: noreply@Clairie-Bleue" . "\r\n";

    return mail($to, $subject, $message, $headers);
}


mail_global("TEST","TEST");
if(mail_global("Test", "Message test")) {
    echo "Le serveur a accepté l'envoi.";
} else {
    echo "Le serveur refuse d'envoyer l'email.";
}
?>

