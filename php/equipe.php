<?php


function getMembreEquipe($conn,$id){
    $sql = "SELECT * FROM equipe_technique WHERE id_equipe_tech = ?";
    $requete = mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($requete,"i",$id);
    mysqli_stmt_execute($requete);
     $res = mysqli_stmt_get_result($requete);
    return mysqli_fetch_assoc($res) ?: null;
}


function getMembreEquipeAll($conn,){
 $stmt = $conn->prepare("SELECT * FROM equipe_technique");
    $stmt->execute();
    $res = $stmt->get_result();
    return $res->fetch_all(MYSQLI_ASSOC) ?: [];
}

function getAnimateurs($conn){
    $stmt = $conn->prepare("SELECT * FROM equipe_technique WHERE access = 2");
    $stmt->execute();
    $res = $stmt->get_result();
    return $res->fetch_all(MYSQLI_ASSOC) ?: [];
}

function updateAnimateur($conn,$data){
    $nom = $data['nom'];
    $mail = $data['mail'];
    $prenom = $data['prenom'];
    $access = $data['access'];
    $id_tech = $data['id_equipe_tech'];

    $stmt = $conn->prepare("UPDATE equipe_technique SET nom = ?, mail = ?, prenom = ?, access = ? WHERE id_equipe_tech = ?");
    $stmt->bind_param("sssii",$nom,$mail,$prenom,$access,$id_tech);
    return $stmt->execute();
}


function createMembreEquipe($conn,$data){
    $nom = $data['nom'];
    $mail = $data['mail'];
    $prenom = $data['prenom'];
    $access = $data['access'];
    $password = $data['password'];
    $password_hache = password_hash($password, PASSWORD_DEFAULT);


    $stmt  = $conn->prepare("INSERT INTO equipe_technique (nom,mail,prenom,access,password) VALUES (?,?,?,?,?)");
    $stmt->bind_param("sssis",$nom,$mail,$prenom,$access,$password_hache);
    return $stmt->execute();
}

function deleteMembreEquipe($conn,$id_tech){
    $stmt =$conn->prepare("DELETE FROM equipe_technique WHERE id_equipe_tech = ?");
    $stmt->bind_param("i",$id_tech);
    return $stmt->execute();
}
?>

