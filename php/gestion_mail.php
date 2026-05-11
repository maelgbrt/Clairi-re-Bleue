<?php
include("../db/db_connect.php");
include("mail.php");
include("familles.php");

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
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$response = null;

switch ($entity) {
    case 'reinitialiser':
        $res =  reinitialisation_token($conn,$data);
        $response = [
            "status" => $res ? "success" : "error",
            "msg" => $res ? "Mail envoyé avec success" : "Error lors de l'envoi du mail"
        ];
        break;

    default:
        http_response_code(400);
        $response = ["status" => "error", "msg" => "Entity non reconnue"];
        break;
}
echo json_encode($response);

?>