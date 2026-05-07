<?php


function getMembreEquipe($conn,$id){
    $sql = "SELECT * FROM equipe_technique WHERE id_equipe_tech = ?";
    $requete = mysqli_prepare($conn,$sql);
    mysqli_stmt_bind_param($requete,"i",$id);
    mysqli_stmt_execute($requete);
     $res = mysqli_stmt_get_result($requete);
    return mysqli_fetch_assoc($res) ?: null;
}

?>