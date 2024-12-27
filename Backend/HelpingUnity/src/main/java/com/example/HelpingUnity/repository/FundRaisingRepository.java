package com.example.HelpingUnity.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HelpingUnity.entity.FundRaising;

public interface FundRaisingRepository extends JpaRepository<FundRaising, Long> {
    List<FundRaising> findByUserId(Long userId);
}
