<?php

//variables
$destinataire = "Shaka.holt@yahoo.com";
$sujet = "Test d'envoi d'email";
$message = "<html><body>";
$message .= "<h1>Voici le recapitulatif de votre reservation</h1>";
$message .= "<p> Emplacement date prix etc...</p>";
$message .= "</body></html>";

$headers = "From: no-reply@votre-site.com\r\n";
$headers .= "Reply-to: no-reply@votre-site.com\r\n";
$headers .= "Content-type: text/html; charset=\"UTF-8\"\r\n";

//envoi de l'email
if (mail($destinataire, $sujet, $message, $headers)){
    echo "l'email a été envoyé avec succès à $destinataire";

}else{
    echo "Une erreur est survenue lors de l'envoi de l'email.";
}


?>