<?php
function updateFamily(PDO $conn, array $data): bool {
    $requiredFields = ['id_famille', 'mail', 'adresse', 'telephone', 'ville'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            error_log("[updateFamily] Champ manquant : $field");
            return false;
        }
    }

    // Si password fourni on le met à jour, sinon on garde l'ancien
    $sql = "UPDATE familles SET 
                mail         = :mail,
                adresse      = :adresse,
                telephone    = :telephone,
                code_postal  = :code_postal,
                id_payeur    = :id_payeur,
                ville        = :ville"
                . (!empty($data['password']) ? ", password = :password" : "") . "
            WHERE id_famille = :id_famille";

    try {
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':mail',        $data['mail'],                          PDO::PARAM_STR);
        $stmt->bindValue(':adresse',     $data['adresse'],                       PDO::PARAM_STR);
        $stmt->bindValue(':telephone',   $data['telephone'],                     PDO::PARAM_STR);
        $stmt->bindValue(':code_postal', $data['code_postal'] ?? null,           PDO::PARAM_STR);
        $stmt->bindValue(':id_payeur',   (int) ($data['id_payeur'] ?? $data['payeur_id']), PDO::PARAM_INT);
        $stmt->bindValue(':ville',       $data['ville'],                         PDO::PARAM_STR);
        $stmt->bindValue(':id_famille',  (int) $data['id_famille'],              PDO::PARAM_INT);

        // On bind le password uniquement s'il est fourni
        if (!empty($data['password'])) {
            $stmt->bindValue(':password', password_hash($data['password'], PASSWORD_BCRYPT), PDO::PARAM_STR);
        }

        return $stmt->execute();

    } catch (PDOException $e) {
        error_log('[updateFamily] Erreur PDO : ' . $e->getMessage());
        return false;
    }
}