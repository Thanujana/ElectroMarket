package com.example.ElectroMart.Service;
import org.springframework.data.mongodb.core.MongoTemplate;
import com.example.ElectroMart.Model.Role;
import com.example.ElectroMart.Model.User;
import com.example.ElectroMart.Repository.RoleRepository;
import com.example.ElectroMart.Repository.UserRepository;
import com.example.ElectroMart.Security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MongoTemplate mongoTemplate;
    /**
     * ✅ Admin Login
     */

    public String loginAdmin(String email, String password) {
        User admin = userRepository.findByEmail(email).orElseThrow(() ->
                new IllegalArgumentException("Invalid email or password"));

        // ✅ Check password using BCrypt
        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        // ✅ Ensure user has "ROLE_ADMIN"
        Set<Role> userRoles = admin.getRoles();
        boolean isAdmin = userRoles.stream().anyMatch(role -> "ROLE_ADMIN".equals(role.getRole()));

        if (!isAdmin) {
            throw new IllegalArgumentException("Access denied. Not an admin.");
        }

        List<String> roleNames = userRoles.stream()
                .map(Role::getRole)
                .toList();

        return jwtUtil.generateToken(admin, roleNames);
    }

    /**
     * ✅ Get Admin Dashboard Statistics
     */
    public Map<String, Object> getAdminDashboard() {
        long totalUsers = userRepository.count();
        long totalAdmins = userRepository.findAll().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> "ROLE_ADMIN".equals(role.getRole())))
                .count();

        long totalApprovedUsers = userRepository.findAll().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> "ROLE_APPROVED_USER".equals(role.getRole())))
                .count();

        return Map.of(
                "totalUsers", totalUsers,
                "totalAdmins", totalAdmins,
                "totalApprovedUsers", totalApprovedUsers
        );
    }

    /**
     * ✅ Get All Users
     */
    public List<User> getAllUsers() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            // ✅ Convert DBRef to full Role objects
            Set<Role> resolvedRoles = user.getRoles().stream()
                    .map(role -> mongoTemplate.findById(role.getId(), Role.class))
                    .collect(Collectors.toSet());

            user.setRoles(resolvedRoles);
        }

        return users;
    }


    /**
     * ✅ Approve User by Assigning "ROLE_APPROVED_USER"
     */
    public void approveUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Role approvedRole = roleRepository.findByRole("ROLE_APPROVED_USER")
                .orElseThrow(() -> new IllegalArgumentException("Role not found"));

        if (user.getRoles() == null) {
            user.setRoles(new HashSet<>());
        }

        user.getRoles().add(approvedRole); // ✅ Store as DBRef reference
        userRepository.save(user);
    }
}

