<?php

namespace App\Providers;

use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use App\Models\Menu;
use App\Models\SubMenu;

class ViewServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        view()->composer('front-end.layouts.main', function ($view) {
            // Get the authenticated user
            $user = Auth::user();

            // Initialize an empty array to store menu items
            $allMenus = [];

            if ($user) {
                // Retrieve menus associated with the user's role
                $menus = Menu::whereHas('roles', function ($query) use ($user) {
                    $query->where('id', $user->role_id);
                })->get();

                // Transform the retrieved menus into the desired format
                $allMenus = $menus->map(function ($menu) {
                    // Retrieve submenus for the current menu item
                    $submenus = SubMenu::where('menu_id', $menu->id)->get();
                    // Map submenus to desired format
                    $formattedSubmenus = $submenus->map(function ($submenu) {
                        return [
                            'title' => $submenu->title,
                            'icon' => $submenu->icon,
                            'route' => $submenu->route,
                        ];
                    })->toArray();

                    return [
                        'title' => $menu->title,
                        'icon' => $menu->icon,
                        'submenus' => $formattedSubmenus, // Include submenus
                    ];
                })->toArray();
            }

            // Pass the menus to the view
            $view->with('menus', $allMenus);
        });
    }
}
