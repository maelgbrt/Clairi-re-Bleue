<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include("../db/db_connect.php");
include("familles.php");
include("user.php");
include("activites.php");
include("emplacements.php");


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

 $response = ["nom" => "mael",
            "age" => 14];

echo json_encode($response);
?>


