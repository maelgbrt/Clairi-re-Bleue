<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include("../db/db_connect.php");
include("familles.php");
include("user.php");
include("activites.php");
include("emplacements.php");
include("equipe.php");


// Autorise n'importe quelle origine (ton Swagger)
header("Access-Control-Allow-Origin: *");
// Autorise les méthodes HTTP classiques
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
// Autorise les headers comme Content-Type ou Authorization (pour ton Bearer Token)
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Très important : Gérer la requête de "pré-vérification" (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}
header('Content-Type: application/json');

$entity   = $_GET['entity'] ?? '';
$id       = $_GET['id'] ?? null;
$option   = $_GET['option'] ?? '';
$secondOption = $_GET['secondOption'] ?? null;
$date_debut = $_GET['date_debut'] ?? null;
$date_fin = $_GET['date_fin'] ?? null;
$today = $_GET['today'] ?? date('Y-m-d');
$mois = $_GET['mois'] ?? null;
// $today = date('Y-m-d H:i:s');
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$response = null;

switch ($entity) {
    case 'family':
        if ($option === 'nbMembre' && $id) {
            $response = getNbMembre($conn, $id);
        } elseif ($option === 'membre') {
            if($secondOption === 'add'){
                $res = ajouterMembreFamille($conn,$data);
                $response = [
                    "status" => $res ? "Success" : "Error",
                    "msg" => $res ? "Membre ajouté a la famille" : "Erreur lors de l'ajout du membre dans une famille"
                ];
            }elseif($secondOption == 'delete' && $id){
                $res = deleteMembreFamille($conn,$id);
                $response = [
                    "status" => $res ? "Success": "Error",
                    "msg" => $res ? "Membre supprimer avec Success" : "Error : Le membre n'a pas été supprimé"
                ];
            }else{
                if($id){
                    $response = getMembreFamille($conn,$id);
                }
            }
        } elseif ($option === 'delete' && $id) {
            $resultat = deleteFamille($conn, $id);
            $response = [
                "status" => ($resultat === "success") ? "success" : $resultat,
                "msg" => $resultat
            ];
        } elseif ($option === 'withPayeur') {
            $response = getFamilleswithPayeur($conn);
        } elseif ($option === 'create') {
            $resultat = createPackFamily($conn, $data);
            $response = [
                "status" => ($resultat === "success") ? "success" : "failed",
                "msg" => $resultat
            ];
        } elseif ($id) {
            $response = getFamilleById($conn, $id);
        } else {
            $response = getFamilles($conn);
        }
        break;

    case 'users':
        $response = $id ? getUserById($conn, $id) : getUsers($conn);
        break;

    case 'activites':
        if ($option === 'fifo') {
            if ($secondOption === 'delete' && $id) {
                $res = deleteFromFifo($conn, $id);
                $response = [
                    "status" => $res ? "success" : "error",
                    "msg"    => $res ? "Entrée supprimée de la file d'attente" : "Erreur lors de la suppression"
                ];
            } elseif ($secondOption === 'accept') {
                $res = AcceptFifo($conn, $data);
                $response = [
                    "msg" => ($res === "success") ? "success" : $res
                ];
            } elseif ($secondOption === 'add') {
                $res = PutFamilyFiFo($conn, $data);
                $response = [
                    "status" => $res ? "success" : "error",
                    "msg"    => $res ? "Entrée ajouter à la file d'attente" : "Erreur lors de l'ajout"
                ];
            } else {

                $response = getActivitesFifo($conn);
            }
        } elseif ($option === 'reservations') {


            if ($secondOption === 'delete' && $id) {
                $res = deleteReservation($conn, $id);
                $response = [
                    "status" => $res ? "success" : "error",
                    "msg"    => $res ? "Reservation supprime" : "Erreur lors de la suppression"
                ];
            } elseif ($secondOption === 'add') {
                $res = putReservationActivite($conn, $data);
                $response = [
                    "status" => $res ? "success" : "error",
                    "msg"    => $res ? "Reservation AQJOUTE" : "Erreur lors de l ajout"
                ];
            } else {
                $response = $id ? getReservationsActivitebyId($conn, $id) : getReservationsActivite($conn);
            }
        } elseif ($option === 'participants' && $id) {
            $response = getParticipantsById($conn, $id);
        } elseif ($option === 'delete' && $id) {
            $res = deleteActivite($conn, $id);
            $response = [
                "status" => $res ? "success" : "error",
                "msg"    => $res ? "Activité supprimée" : "Erreur lors de la suppression"
            ];
        } elseif ($option === 'update' && $data) {

            $res = updateActivite($conn, $data);
            $response = [
                "status" => $res ? "success" : "error",
                "msg"    => $res ? "Activité update" : "Erreur lors de update"
            ];
        } elseif ($option === 'add') {
            $res = addActivite($conn, $data);
            $response = [
                "status" => $res ? "success" : "error",
                "msg"    => $res ? "Activité ajoutée" : "Erreur lors de l'ajout"
            ];
        } elseif ($option === 'withanimateur' && $id) {
            $response = getwithAnimateur($conn,$id);
        } else {
            $response = $id ? getActiviteById($conn, $id) : getActivites($conn);
        }
        break;

    case 'emplacements':

        if ($option === 'reservations') {
            // if($secondOption === 'entreDate' && $date_debut && $date_fin){
            //     $response = getReservationEmplacementswithDates($conn, $date_debut, $date_fin);
            //     // $response = $date_fin;
            // if($secondOption === 'BetweenDate' && $today ){
            //     $response = ($conn,$today);
            if ($secondOption === 'add') {
                $response = PutReservationsEmplacement($conn, $data);
            } elseif ($secondOption === 'delete' && $id) {
                $res = deleteReservationEmplacement($conn, $id);
                $response = [
                    "status" => $res ? "success" : "error",
                    "msg"    => $res ? "Reservation supprime" : "Erreur lors de la suppression"
                ];
            }
        } elseif (($option === 'mois' && $mois)) {
            $response = getBetweenDateOnEmplacementGeneral($conn, $mois);
            // $response = [
            //     "res" => $date_debut,
            //     "date_fin" => $date_fin
            // ];
        } else {
            $response = getEmplacement($conn);
        }
        break;
    case 'equipeTechnique':

            if ($option == "getMembre" && $id) {
                $response = getMembreEquipe($conn,$id);
            }elseif($option == "animateurs"){
                if($secondOption == 'update' && $data){
                    $res = updateAnimateur($conn,$data);
                    $response = [
                        "status" => $res ? "Success" : "Error",
                        "msg" => $res ? "Animateur modifié avec success": "Error lors de l'update de l'animateur"
                    ];
               }elseif($secondOption == 'add'){
                    $res = createMembreEquipe($conn,$data);
                    $response = [
                        "status" => $res ? "Success" : "Error",
                        "msg" => $res ? "Membre crée avec success" :"Error lors de l'ajout du membre"
                    ];
                }else{
                $response = getAnimateurs($conn);
                }
            }elseif($option == 'delete' && $id){
                    $res = deleteMembreEquipe($conn,$id);
                    $response = [
                        "status" => $res ? "Success" : "Error",
                        "msg" => $res ? "Membre supprimer avec success" : "Error lors de la suppression du membre"
                    ];
             }else{

                    $response = getMembreEquipeAll($conn);
                }

        break;
    case 'message' :
        if($option == 'delete' && $id){
            $res = deleteMessage($conn,$id);
            $response = [
                "status" => $res ? "Success" : "Error",
                "msg" => $res ? "Message supprimer avec succès" : "Error lors de la suppression du message"
            ];
        }
        elseif($data){
        $res = sendMessage($conn,$data);
        $response = [
            "status" => $res ? "Success" : "Error",
            "msg" => $res 
        ];}else{
            $response=getMessage($conn);
        }
    break;
    default:
        http_response_code(400);
        $response = ["status" => "error", "msg" => "Entity non reconnue"];
        break;
}

echo json_encode($response);
