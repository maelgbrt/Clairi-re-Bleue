<?php
function PutEmplacementReservation(PDO $conn, array $data): bool {
    $requiredFields = ['id_famille', 'num_emplacement', 'date_debut', 'date_fin'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            error_log("[PutEmplacementReservation] Champ manquant : $field");
            return false;
        }
    }

    $sql = "INSERT INTO reservation_emplacement (id_famille, num_emplacement, date_debut, date_fin)
            VALUES (:id_famille, :num_emplacement, :date_debut, :date_fin)";

    try {
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':id_famille',      (int) $data['id_famille'],      PDO::PARAM_INT);
        $stmt->bindValue(':num_emplacement', (int) $data['num_emplacement'], PDO::PARAM_INT);
        $stmt->bindValue(':date_debut',            $data['date_debut'],      PDO::PARAM_STR);
        $stmt->bindValue(':date_fin',              $data['date_fin'],        PDO::PARAM_STR);

        return $stmt->execute();

    } catch (PDOException $e) {
        error_log('[PutEmplacementReservation] Erreur PDO : ' . $e->getMessage());
        return false;
    }
}



function PutEmplacementFiFo(PDO $conn, array $data): bool {
    $requiredFields = ['id_famille', 'num_emplacement'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            error_log("[PutEmplacementFiFo] Champ manquant : $field");
            return false;
        }
    }

    $sql = "INSERT INTO reservation_emplacement (id_famille, num_emplacement, date_debut, date_fin)
            VALUES (:id_famille, :num_emplacement, :date_debut, :date_fin)";

    try {
        $stmt = $conn->prepare($sql);

        $stmt->bindValue(':id_famille',      (int) $data['id_famille'],      PDO::PARAM_INT);
        $stmt->bindValue(':num_emplacement', (int) $data['num_emplacement'], PDO::PARAM_INT);
        $stmt->bindValue(':date_debut',      date('Y-m-d H:i:s'),           PDO::PARAM_STR);
        $stmt->bindValue(':date_fin',        null,                           PDO::PARAM_NULL);

        return $stmt->execute();

    } catch (PDOException $e) {
        error_log('[PutEmplacementFiFo] Erreur PDO : ' . $e->getMessage());
        return false;
    }
}